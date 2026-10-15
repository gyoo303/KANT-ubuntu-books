/**
 * 로그인/회원가입 화면(/auth/signin)에서 호출하는 Server Action 모음
 *
 * [Server Action이란?]
 * 파일 맨 위의 'use server'로 표시한 함수는 서버에서만 실행된다.
 * 화면(클라이언트 컴포넌트)에서 일반 함수처럼 부르거나 <form action={...}>에 넣으면
 * Next.js가 내부적으로 POST 요청을 만들어 서버에서 실행하고 결과를 돌려준다.
 * 그래서 API 라우트를 따로 만들지 않고도 DB 저장·로그인 시작을 할 수 있다.
 *
 * [signIn()이 redirect를 "던지는" 이유]
 * 서버에서 signIn()을 부르면 Auth.js가 다음 화면(네이버 로그인, 메일 확인 안내 등)으로
 * 이동시키기 위해 Next.js의 redirect 에러를 throw한다. Next.js가 이걸 잡아 실제 이동을 처리하므로
 * signIn() 호출을 try/catch로 감싸 삼키면 이동이 안 된다.
 */
'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { signIn } from '@/auth';
import { prisma } from '@/lib/prisma';
import { toSafeCallbackUrl } from '@/shared/utils/safeCallbackUrl';

/**
 * 회원가입 입력 검증 스키마 (zod)
 * 화면에서 검증하더라도 요청은 조작될 수 있으므로 서버에서 반드시 다시 검증한다.
 */
const SignUpSchema = z.object({
    name: z.string().trim().min(1, '이름을 입력해 주세요.'),
    phone: z
        .string()
        .regex(/^010-\d{4}-\d{4}$/, '010-0000-0000 형식으로 입력해 주세요.'),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email('이메일 형식을 확인해 주세요.')),
    agreeTerms: z.literal(true, { error: '필수 약관에 동의해 주세요.' }),
    agreeMarketing: z.boolean().default(false),
    callbackUrl: z.string().optional(),
});

/**
 * proxy가 붙여 주는 callbackUrl은 절대 URL(http://host/mypage)이다.
 * Server Action 요청에는 브라우저가 Origin 헤더(지금 보고 있는 사이트 주소)를 붙이므로,
 * callbackUrl의 origin이 이것과 같을 때만 경로로 바꿔 쓰고 그 외에는 '/'로 보낸다.
 */
async function resolveCallbackUrl(raw: string | null | undefined) {
    const origin = (await headers()).get('origin') ?? undefined;
    return toSafeCallbackUrl(raw, origin);
}

export type SignUpInput = z.input<typeof SignUpSchema>;

export type SignUpResult =
    | {
          ok: false;
          error: 'INVALID_INPUT';
          fieldErrors: Partial<Record<keyof SignUpInput, string[]>>;
      }
    | { ok: false; error: 'ALREADY_REGISTERED' };

/**
 * [회원가입 탭] 이메일 가입
 *
 * 매직 링크(signIn('nodemailer'))는 이메일만 받기 때문에 이름·휴대폰·약관 동의를 넘길 수 없다.
 * 그래서 순서를 이렇게 한다.
 *   1) 입력 검증 → 2) 이미 가입한 이메일인지 확인 → 3) User를 먼저 저장(emailVerified는 아직 null)
 *   → 4) 매직 링크 발송. 사용자가 링크를 누르면 Auth.js가 emailVerified를 채우고 로그인시킨다.
 * auth.ts의 signIn 콜백은 "가입된 이메일만 링크 발송"을 허용하는데, 3)에서 저장했으므로 통과한다.
 */
export async function signUpWithEmail(
    input: SignUpInput,
): Promise<SignUpResult> {
    const parsed = SignUpSchema.safeParse(input);
    if (!parsed.success) {
        return {
            ok: false,
            error: 'INVALID_INPUT',
            fieldErrors: z.flattenError(parsed.error).fieldErrors,
        };
    }
    const d = parsed.data;

    const exists = await prisma.user.findUnique({ where: { email: d.email } });
    if (exists) return { ok: false, error: 'ALREADY_REGISTERED' }; // 화면에서 로그인 탭으로 안내

    await prisma.user.create({
        data: {
            email: d.email,
            name: d.name,
            phone: d.phone,
            termsAgreedAt: new Date(),
            marketingOptIn: d.agreeMarketing,
        },
    });

    // 성공하면 signIn이 매직 링크 안내 화면으로 redirect를 throw한다
    return signIn('nodemailer', {
        email: d.email,
        redirectTo: await resolveCallbackUrl(d.callbackUrl),
    });
}

/**
 * [로그인 탭] 이메일 로그인 링크 받기
 * 가입하지 않은 이메일이면 auth.ts의 signIn 콜백이 회원가입 탭으로 보낸다.
 */
export async function signInWithEmail(formData: FormData) {
    const email = String(formData.get('email') ?? '')
        .trim()
        .toLowerCase();
    const callbackUrl = await resolveCallbackUrl(
        formData.get('callbackUrl') as string | null,
    );
    await signIn('nodemailer', { email, redirectTo: callbackUrl });
}

/**
 * [두 탭 공통] 네이버 로그인/가입
 * 처음 오는 사용자면 어댑터가 User를 자동으로 만들고, 같은 이메일의 User가 있으면 그 계정에 연결한다.
 */
export async function signInWithNaver(callbackUrl?: string) {
    await signIn('naver', {
        redirectTo: await resolveCallbackUrl(callbackUrl),
    });
}

// TODO(kakao): 카카오 provider 활성화 후 추가
// export async function signInWithKakao(callbackUrl?: string) {
//     await signIn('kakao', {
//         redirectTo: await resolveCallbackUrl(callbackUrl),
//     });
// }
