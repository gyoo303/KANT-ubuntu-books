// proxy.ts에서도 import되는 설정. Prisma 등 DB 접근 코드는 auth.ts에 둔다.
import type { NextAuthConfig } from 'next-auth';
import Naver from 'next-auth/providers/naver';
// TODO(kakao): 비즈 앱 전환 후 이메일 필수 동의를 받을 수 있게 되면 활성화.
//              전화번호까지 받으려면 사업자 인증이 필요한지 확인할 것.
// import Kakao from 'next-auth/providers/kakao';

const MEMBER_ONLY_PREFIXES = ['/mypage', '/subscription/letter'];
const ADMIN_PREFIX = '/admin';

export default {
    providers: [
        Naver({
            // 같은 이메일이면 기존 계정(이메일 가입·다른 SNS)에 연결해 한 계정으로 합친다
            allowDangerousEmailAccountLinking: true,
            profile: (p) => ({
                id: p.response.id,
                name: p.response.name ?? null,
                email: p.response.email,
                image: p.response.profile_image ?? null,
                // 네이버 앱 설정에서 휴대폰 동의 항목을 켠 경우에만 들어옴
                phone: p.response.mobile ?? null,
            }),
        }),
        // TODO(kakao): Kakao({ allowDangerousEmailAccountLinking: true }),
    ],
    pages: {
        signIn: '/auth/signin',
        // TODO(screens): 디자인이 나오면 연결. 그전까지는 Auth.js 기본 화면 사용
        // verifyRequest: '/auth/verify',
        // error: '/auth/error',
    },
    session: { strategy: 'jwt' },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const path = nextUrl.pathname;
            const isAdmin = path.startsWith(ADMIN_PREFIX);
            const needsLogin =
                isAdmin || MEMBER_ONLY_PREFIXES.some((p) => path.startsWith(p));
            if (!needsLogin) return true;

            // false → pages.signIn 으로 이동하면서 callbackUrl(원래 주소)을 자동으로 붙여 준다
            if (!auth?.user) return false;

            if (isAdmin && auth.user.role !== 'ADMIN') {
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        },
        jwt({ token, user }) {
            if (user) token.role = user.role ?? 'MEMBER';
            return token;
        },
        session({ session, token }) {
            if (session.user) session.user.role = token.role ?? 'MEMBER';
            return session;
        },
        redirect({ url, baseUrl }) {
            // 같은 사이트 주소만 허용 (Open Redirect 방지)
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
