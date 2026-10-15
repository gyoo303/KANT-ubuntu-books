// Prisma 어댑터 + 이메일 매직 링크까지 포함한 전체 인증 설정
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Nodemailer from 'next-auth/providers/nodemailer';
import authConfig from './auth.config';
import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        ...authConfig.providers,
        // 메일 발송 서비스가 정해지면 교체 가능 (예: Resend provider)
        Nodemailer({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
        async signIn({ user, account, email }) {
            // 로그인 탭에 가입하지 않은 이메일이 들어오면 회원가입 탭으로 보낸다.
            // (회원가입은 signUpWithEmail 액션이 User를 먼저 만든 뒤 링크를 보내므로 여기를 통과함)
            if (
                account?.provider === 'nodemailer' &&
                email?.verificationRequest
            ) {
                if (!user.email) return false;
                const exists = await prisma.user.findUnique({
                    where: { email: user.email },
                });
                return exists
                    ? true
                    : '/auth/signin?mode=signup&error=NotRegistered';
            }
            // 네이버: 신규면 자동 가입 (소셜 가입은 약관 동의를 별도로 받지 않음)
            return true;
        },
    },
});
