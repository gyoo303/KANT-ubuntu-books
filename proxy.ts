/**
 * Proxy (Next.js 16에서 middleware가 proxy로 이름이 바뀜)
 *
 * 요청이 페이지에 도달하기 "전에" 실행되는 코드다.
 * 페이지를 렌더링하기 전에 로그인 여부를 확인해 바로 리다이렉트할 수 있어서,
 * 회원 전용 페이지가 잠깐 보였다가 튕기는 현상 없이 접근을 막을 수 있다.
 *
 * NextAuth(authConfig).auth를 그대로 내보내면:
 *   1) 쿠키의 JWT를 복호화해 세션(auth)을 만들고
 *   2) auth.config.ts의 authorized 콜백을 실행해
 *   3) 결과에 따라 통과 / 로그인 페이지로 리다이렉트 / 홈으로 리다이렉트 한다.
 * DB를 쓰는 auth.ts가 아니라 auth.config.ts만 쓰는 이유는 auth.config.ts 상단 주석 참고.
 */
import NextAuth from 'next-auth';
import authConfig from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    /**
     * proxy를 실행할 경로. 정규식의 (?!...)는 "이것으로 시작하지 않는"이라는 뜻이다.
     * - api: API는 리다이렉트 대신 401 JSON을 줘야 하므로 각 Route Handler에서 직접 막는다
     * - _next/static, _next/image, favicon.ico, 확장자가 있는 파일(.png 등): 정적 파일은 검사할 필요가 없다
     */
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
