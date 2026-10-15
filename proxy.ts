// Next.js 16: middleware → proxy. 페이지 접근 제어는 auth.config.ts의 authorized 콜백에서 처리한다.
import NextAuth from 'next-auth';
import authConfig from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    // API(/api)는 각 Route Handler에서 401로 직접 막는다
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
