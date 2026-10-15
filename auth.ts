/**
 * Auth.js 전체 설정 (서버 전용)
 *
 * auth.config.ts의 공통 설정에 DB와 메일이 필요한 부분을 더한다.
 * 여기서 만든 함수들을 앱 곳곳에서 import해 쓴다.
 * - handlers: /api/auth/* 라우트(로그인 시작, 콜백, 로그아웃 등)를 처리하는 GET/POST 핸들러
 * - auth():   서버 컴포넌트·Route Handler·Server Action에서 현재 세션을 읽는 함수
 * - signIn(): 서버에서 로그인 흐름을 시작 (OAuth 화면으로 이동 / 매직 링크 발송)
 * - signOut(): 로그아웃 (세션 쿠키 삭제)
 */
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Nodemailer from 'next-auth/providers/nodemailer';
import authConfig from './auth.config';
import { prisma } from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,

    /**
     * [어댑터]
     * Auth.js가 사용자 정보를 DB에 읽고 쓰는 방법을 알려 주는 연결부.
     * - User: 사람 1명
     * - Account: 그 사람에 연결된 로그인 수단(네이버 등). 한 User에 여러 개 가능
     * - VerificationToken: 매직 링크용 일회성 토큰
     * 세션은 JWT 쿠키에 있으므로 DB에 저장하지 않는다.
     */
    adapter: PrismaAdapter(prisma),

    providers: [
        ...authConfig.providers,
        /**
         * [이메일 매직 링크]
         * 비밀번호 대신 "로그인 링크"를 메일로 보내는 방식.
         * 1) 사용자가 이메일 입력 → 무작위 토큰 생성, 해시해서 VerificationToken에 저장(기본 24시간 유효)
         * 2) /api/auth/callback/nodemailer?token=...&email=... 링크를 메일로 발송
         * 3) 링크 클릭 → 토큰 대조 후 삭제(1회용) → 로그인 완료, emailVerified 기록
         *
         * EMAIL_SERVER는 SMTP(메일 발송 프로토콜) 서버 주소다.
         * 로컬에서는 docker compose로 띄운 Mailpit(smtp://localhost:1025)을 쓰면
         * 실제로 발송하지 않고 http://localhost:8025 웹 화면에서 받은 메일을 볼 수 있다.
         * 메일 발송 서비스가 정해지면 SMTP 값만 바꾸거나 Resend 등 다른 provider로 교체한다.
         */
        Nodemailer({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
    ],

    callbacks: {
        ...authConfig.callbacks,
        /**
         * [로그인 허용 여부] 인증 직전에 호출된다.
         * true면 진행, false면 에러 화면, 문자열이면 그 주소로 이동.
         *
         * 이메일 provider는 두 번 호출된다.
         * - 메일 발송 직전: email.verificationRequest === true  ← 여기서 미가입 이메일을 거른다
         * - 링크 클릭 후:   verificationRequest 없음
         * 로그인 탭에 가입하지 않은 이메일을 넣으면 메일을 보내지 않고 회원가입 탭으로 보낸다.
         * 회원가입은 signUpWithEmail 액션이 User를 먼저 만든 뒤 링크를 보내므로 여기를 통과한다.
         */
        async signIn({ user, account, email }) {
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
            // 네이버: 신규면 어댑터가 User를 자동 생성 (소셜 가입은 약관 동의를 별도로 받지 않음)
            return true;
        },
    },
});
