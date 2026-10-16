/**
 * 로그인 화면(/auth/signin)에서 호출하는 Server Action 모음
 * (로그아웃은 헤더에서 next-auth/react의 signOut()으로 처리한다)
 *
 * [Server Action이란?]
 * 파일 맨 위의 'use server'로 표시한 함수는 서버에서만 실행된다.
 * 화면에서 <form action={...}>에 넣거나 일반 함수처럼 부르면
 * Next.js가 내부적으로 POST 요청을 만들어 서버에서 실행하고 결과를 돌려준다.
 *
 * [signIn()이 redirect를 "던지는" 이유]
 * 서버에서 signIn()을 부르면 Auth.js가 다음 화면(네이버 로그인 등)으로 이동시키기 위해
 * Next.js의 redirect 에러를 throw한다. Next.js가 이걸 잡아 실제 이동을 처리하므로
 * signIn() 호출을 try/catch로 감싸 삼키면 이동이 안 된다.
 *
 * [가입과 로그인이 한 버튼인 이유]
 * 소셜 로그인은 처음 온 사람이면 가입, 이미 가입한 사람이면 로그인으로 처리된다.
 * 그래서 로그인/회원가입 탭을 나누지 않고 한 화면, 한 버튼으로 통합했다.
 */
'use server';

import { headers } from 'next/headers';
import { signIn } from '@/auth';
import { toSafeCallbackUrl } from '@/shared/utils/safeCallbackUrl';

/**
 * proxy가 붙여 주는 callbackUrl은 절대 URL(http://host/mypage)이다.
 * Server Action 요청에는 브라우저가 Origin 헤더(지금 보고 있는 사이트 주소)를 붙이므로,
 * callbackUrl의 origin이 이것과 같을 때만 경로로 바꿔 쓰고 그 외에는 '/'로 보낸다.
 */
async function resolveCallbackUrl(raw: string | null | undefined) {
    const origin = (await headers()).get('origin') ?? undefined;
    return toSafeCallbackUrl(raw, origin);
}

/**
 * 네이버로 계속하기 (처음이면 가입, 아니면 로그인)
 * 로그인 화면에서 callbackUrl을 bind해서 넘긴다: signInWithNaver.bind(null, callbackUrl)
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

/* ------------------------------------------------------------------------
 * TODO(email): 이메일 회원가입·로그인 (현재 사용하지 않음)
 *
 * 이메일 매직 링크를 다시 쓰기로 하면 아래 코드를 되살리고,
 * auth.ts의 Nodemailer provider와 signIn 콜백, Prisma 어댑터(TODO(db))도 함께 켠다.
 * 되살릴 때 import도 추가: import { z } from 'zod'; import { prisma } from '@/lib/prisma';
 *
 * 매직 링크(signIn('nodemailer'))는 이메일만 받기 때문에 이름·약관 동의를 함께 넘길 수 없다.
 * 그래서 가입은 1) 입력 검증 → 2) 중복 확인 → 3) User를 먼저 저장 → 4) 링크 발송 순서로 한다.
 * 휴대폰은 가입 때 받지 않는다 (결제 화면의 배송지 연락처에서 받음).
 *
 * const SignUpSchema = z.object({
 *     name: z.string().trim().min(1, '이름을 입력해 주세요.'),
 *     email: z.string().trim().toLowerCase().pipe(z.email('이메일 형식을 확인해 주세요.')),
 *     agreeTerms: z.literal(true, { error: '필수 약관에 동의해 주세요.' }),
 *     agreeMarketing: z.boolean().default(false),
 *     callbackUrl: z.string().optional(),
 * });
 *
 * export async function signUpWithEmail(input: z.input<typeof SignUpSchema>) {
 *     const parsed = SignUpSchema.safeParse(input);
 *     if (!parsed.success) {
 *         return { ok: false, error: 'INVALID_INPUT', fieldErrors: z.flattenError(parsed.error).fieldErrors } as const;
 *     }
 *     const d = parsed.data;
 *     if (await prisma.user.findUnique({ where: { email: d.email } })) {
 *         return { ok: false, error: 'ALREADY_REGISTERED' } as const;
 *     }
 *     await prisma.user.create({
 *         data: { email: d.email, name: d.name, termsAgreedAt: new Date(), marketingOptIn: d.agreeMarketing },
 *     });
 *     return signIn('nodemailer', { email: d.email, redirectTo: await resolveCallbackUrl(d.callbackUrl) });
 * }
 *
 * export async function signInWithEmail(formData: FormData) {
 *     const email = String(formData.get('email') ?? '').trim().toLowerCase();
 *     const callbackUrl = await resolveCallbackUrl(formData.get('callbackUrl') as string | null);
 *     await signIn('nodemailer', { email, redirectTo: callbackUrl });
 * }
 * ---------------------------------------------------------------------- */
