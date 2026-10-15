/**
 * Auth.js 전체 설정 (서버 전용)
 *
 * auth.config.ts의 공통 설정에 DB와 메일이 필요한 부분을 더하는 자리다.
 * 여기서 만든 함수들을 앱 곳곳에서 import해 쓴다.
 * - handlers: /api/auth/* 라우트(로그인 시작, 콜백, 로그아웃 등)를 처리하는 GET/POST 핸들러
 * - auth():   서버 컴포넌트·Route Handler·Server Action에서 현재 세션을 읽는 함수
 * - signIn(): 서버에서 로그인 흐름을 시작 (네이버 로그인 화면으로 이동)
 * - signOut(): 로그아웃 (세션 쿠키 삭제)
 *
 * ⚠️ [현재 임시 상태] DB(Prisma 어댑터)와 이메일 로그인은 꺼져 있다.
 * - TODO(db): DB가 정해지면 아래 주석의 PrismaAdapter를 다시 켠다.
 *   지금은 어댑터 없이 "JWT 쿠키만"으로 로그인 상태를 유지한다.
 *   그래서 사용자 정보가 서버 어디에도 저장되지 않고,
 *   session.user.id는 DB User.id가 아니라 "네이버가 준 사용자 고유번호"다.
 *   (DB를 켜면 DB User.id로 바뀐다. 그 전에 브라우저 LocalStorage에 쌓인 데이터는 옮겨지지 않는다)
 * - TODO(email): 이메일 매직 링크 로그인을 다시 쓰기로 하면 아래 주석의 Nodemailer와 signIn 콜백을 켠다.
 *   매직 링크는 토큰을 VerificationToken 테이블에 저장하므로 TODO(db)가 먼저 풀려야 한다.
 */
import NextAuth from 'next-auth';
import authConfig from './auth.config';
// TODO(db): import { PrismaAdapter } from '@auth/prisma-adapter';
// TODO(db): import { prisma } from '@/lib/prisma';
// TODO(email): import Nodemailer from 'next-auth/providers/nodemailer';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,

    /**
     * TODO(db): [어댑터]
     * Auth.js가 사용자 정보를 DB에 읽고 쓰는 방법을 알려 주는 연결부.
     * - User: 사람 1명
     * - Account: 그 사람에 연결된 로그인 수단(네이버 등). 한 User에 여러 개 가능
     * - VerificationToken: 매직 링크용 일회성 토큰
     * 어댑터를 켜면 처음 로그인한 사람의 User·Account가 자동으로 만들어지고,
     * 같은 이메일이면 기존 User에 연결된다(auth.config.ts의 allowDangerousEmailAccountLinking).
     */
    // adapter: PrismaAdapter(prisma),

    providers: [
        ...authConfig.providers,
        /**
         * TODO(email): [이메일 매직 링크]
         * 비밀번호 대신 "로그인 링크"를 메일로 보내는 방식.
         * 1) 사용자가 이메일 입력 → 무작위 토큰 생성, 해시해서 VerificationToken에 저장(기본 24시간 유효)
         * 2) /api/auth/callback/nodemailer?token=...&email=... 링크를 메일로 발송
         * 3) 링크 클릭 → 토큰 대조 후 삭제(1회용) → 로그인 완료, emailVerified 기록
         * EMAIL_SERVER는 SMTP(메일 발송 프로토콜) 서버 주소다. 로컬 테스트는 docker-compose.yml의 Mailpit 사용.
         */
        // Nodemailer({
        //     server: process.env.EMAIL_SERVER,
        //     from: process.env.EMAIL_FROM,
        // }),
    ],

    /**
     * TODO(email): [로그인 허용 여부] 이메일 로그인을 켤 때 함께 켠다.
     * 이메일 provider는 메일 발송 직전(email.verificationRequest === true)에 한 번 더 호출되므로,
     * 그때 가입하지 않은 이메일이면 메일을 보내지 않고 가입 안내로 보낸다.
     */
    // callbacks: {
    //     ...authConfig.callbacks,
    //     async signIn({ user, account, email }) {
    //         if (account?.provider === 'nodemailer' && email?.verificationRequest) {
    //             if (!user.email) return false;
    //             const exists = await prisma.user.findUnique({ where: { email: user.email } });
    //             return exists ? true : '/auth/signin?error=NotRegistered';
    //         }
    //         return true;
    //     },
    // },
});
