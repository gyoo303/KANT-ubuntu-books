'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { signIn } from '@/auth';
import { prisma } from '@/lib/prisma';
import { toSafeCallbackUrl } from '@/shared/utils/safeCallbackUrl';

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
 * proxy가 붙여 주는 callbackUrl은 절대 URL(http://host/mypage)이므로,
 * 요청 Origin과 같을 때만 경로로 바꿔 쓰고 그 외에는 '/'로 보낸다.
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

/** [회원가입 탭] 이메일 가입: User를 먼저 만들고 매직 링크를 보낸다. 성공하면 redirect된다. */
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

/** [로그인 탭] 이메일 로그인 링크 받기 */
export async function signInWithEmail(formData: FormData) {
    const email = String(formData.get('email') ?? '')
        .trim()
        .toLowerCase();
    const callbackUrl = await resolveCallbackUrl(
        formData.get('callbackUrl') as string | null,
    );
    await signIn('nodemailer', { email, redirectTo: callbackUrl });
}

/** [두 탭 공통] 소셜 로그인/가입 */
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
