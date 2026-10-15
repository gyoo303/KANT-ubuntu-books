/**
 * Auth.js(NextAuth v5) 공통 설정
 *
 * [왜 auth.config.ts와 auth.ts를 나누나?]
 * - 이 파일은 proxy.ts(요청이 페이지에 닿기 전에 실행되는 코드)에서도 import된다.
 *   proxy는 "가볍게, 공유 모듈·전역 상태에 기대지 말 것"이 원칙이라
 *   DB 접근(Prisma)이나 메일 발송(Nodemailer)처럼 무거운 코드는 auth.ts에만 둔다.
 * - 그래서 여기에는 "DB 없이도 판단할 수 있는 것"만 있다:
 *   OAuth provider 정의, 접근 제어 규칙, JWT/세션 변환, 리다이렉트 검증.
 *
 * [전체 로그인 흐름 요약]
 * 1) 비로그인 사용자가 /mypage 접근
 *    → proxy.ts가 아래 authorized 콜백 실행 → false 반환
 *    → Auth.js가 /auth/signin?callbackUrl=<원래 주소> 로 307 리다이렉트
 * 2) 사용자가 네이버 로그인 또는 이메일 매직 링크로 인증
 * 3) Auth.js가 JWT(암호화된 토큰)를 쿠키에 저장 → redirect 콜백으로 callbackUrl 검증 후 원래 페이지로 복귀
 * 4) 이후 요청마다 쿠키의 JWT를 복호화해 auth 객체를 만들고 authorized 콜백이 다시 판단
 */
import type { NextAuthConfig } from 'next-auth';
import Naver from 'next-auth/providers/naver';
// TODO(kakao): 비즈 앱 전환 후 이메일 필수 동의를 받을 수 있게 되면 활성화.
//              전화번호까지 받으려면 사업자 인증이 필요한지 확인할 것.
// import Kakao from 'next-auth/providers/kakao';

/** 로그인해야 들어갈 수 있는 경로 (명세서 2.2 회원 인증 필수 영역) */
const MEMBER_ONLY_PREFIXES = ['/mypage', '/subscription/letter'];
/** 점주(ADMIN)만 들어갈 수 있는 경로 */
const ADMIN_PREFIX = '/admin';

export default {
    /**
     * [Provider]
     * 로그인 수단 하나하나를 provider라고 부른다.
     * 네이버는 OAuth 2.0 방식:
     *   우리 사이트 → 네이버 로그인 화면 → 사용자가 동의 → 네이버가 /api/auth/callback/naver 로
     *   인가 코드를 돌려줌 → Auth.js가 코드로 토큰·프로필을 받아 사용자 식별
     * clientId/secret은 환경변수 AUTH_NAVER_ID / AUTH_NAVER_SECRET을 Auth.js가 자동으로 읽는다.
     */
    providers: [
        Naver({
            /**
             * [계정 연결]
             * 기본값(false)에서는 같은 이메일의 User가 이미 있으면 OAuthAccountNotLinked 에러를 낸다.
             * 다른 사람이 내 이메일로 SNS 계정을 만들어 내 계정을 가로채는 것을 막기 위한 기본 방어다.
             * 우리는 네이버가 넘겨주는 이메일을 신뢰하기로 하고, 같은 이메일이면 같은 사람으로 보아
             * 기존 User에 Account(연동 정보)를 하나 더 붙여 한 계정으로 합친다. (팀 결정 사항)
             */
            allowDangerousEmailAccountLinking: true,
            /**
             * 네이버가 돌려준 프로필을 우리 User 모양으로 변환한다.
             * 여기서 반환한 값이 신규 가입 시 Prisma 어댑터의 createUser로 그대로 전달된다.
             * (id는 어댑터가 버리고 DB의 uuid 기본값을 쓴다)
             */
            profile: (p) => ({
                id: p.response.id,
                name: p.response.name ?? null,
                email: p.response.email,
                image: p.response.profile_image ?? null,
                // 네이버 개발자센터 앱 설정에서 '휴대전화번호' 동의 항목을 켠 경우에만 들어옴
                phone: p.response.mobile ?? null,
            }),
        }),
        // TODO(kakao): Kakao({ allowDangerousEmailAccountLinking: true }),
    ],

    /**
     * Auth.js 기본 화면 대신 우리 화면을 쓸 경로.
     * signIn을 지정하면 "로그인이 필요할 때" 이 경로로 보내면서 callbackUrl 쿼리를 붙여 준다.
     */
    pages: {
        signIn: '/auth/signin',
        // TODO(screens): 디자인이 나오면 연결. 그전까지는 Auth.js 기본 화면 사용
        // verifyRequest: '/auth/verify', // "메일을 확인하세요" 안내
        // error: '/auth/error',
    },

    /**
     * [세션 전략: JWT]
     * - database 전략: 세션을 DB 테이블에 저장하고 요청마다 DB 조회
     * - jwt 전략: 세션 정보를 AUTH_SECRET으로 암호화해 쿠키에 저장, 요청마다 복호화만 함
     * proxy에서 DB 없이 로그인 여부·권한을 판단해야 하므로 JWT를 쓴다.
     * (그래서 Prisma 스키마에 Session 모델이 없다)
     */
    session: { strategy: 'jwt' },

    callbacks: {
        /**
         * [접근 제어] proxy.ts가 매 요청마다 호출한다.
         * - true: 통과
         * - false: pages.signIn으로 보내며 callbackUrl=<현재 주소> 자동 첨부
         * - Response: 그 응답을 그대로 돌려줌 (여기서는 권한 없는 사용자를 홈으로)
         */
        authorized({ auth, request: { nextUrl } }) {
            const path = nextUrl.pathname;
            const isAdmin = path.startsWith(ADMIN_PREFIX);
            const needsLogin =
                isAdmin || MEMBER_ONLY_PREFIXES.some((p) => path.startsWith(p));
            if (!needsLogin) return true;

            if (!auth?.user) return false;

            if (isAdmin && auth.user.role !== 'ADMIN') {
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        },

        /**
         * [JWT 만들기] 토큰이 만들어지거나 갱신될 때 호출된다.
         * user는 "막 로그인한 순간"에만 들어오고(DB의 User), 이후 요청에서는 undefined다.
         * 그래서 로그인 순간에 role을 토큰에 복사해 두어야 이후 요청에서도 권한을 알 수 있다.
         * 주의: 관리자 권한을 DB에서 바꾸면 다시 로그인해야 토큰에 반영된다.
         */
        jwt({ token, user }) {
            if (user) token.role = user.role ?? 'MEMBER';
            return token;
        },

        /**
         * [세션 만들기] auth() / useSession()이 돌려줄 session 객체를 만든다.
         * 토큰에 넣어 둔 role을 session.user.role로 꺼내 화면·API에서 쓸 수 있게 한다.
         */
        session({ session, token }) {
            if (session.user) session.user.role = token.role ?? 'MEMBER';
            return session;
        },

        /**
         * [리다이렉트 검증] 로그인/로그아웃 후 이동할 주소를 최종 결정한다.
         * Open Redirect 방지: callbackUrl=https://evil.com 같은 값으로
         * 로그인 직후 피싱 사이트로 보내는 공격을 막기 위해 같은 사이트 주소만 허용한다.
         */
        redirect({ url, baseUrl }) {
            if (url.startsWith('/') && !url.startsWith('//')) {
                return `${baseUrl}${url}`;
            }
            try {
                return new URL(url).origin === baseUrl ? url : baseUrl;
            } catch {
                return baseUrl;
            }
        },
    },
} satisfies NextAuthConfig;
