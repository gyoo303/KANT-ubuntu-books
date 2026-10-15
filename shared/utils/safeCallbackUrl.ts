/**
 * 로그인 후 돌아갈 callbackUrl을 같은 사이트 경로로만 제한한다.
 *
 * [Open Redirect란?]
 * 로그인 페이지가 callbackUrl을 검사 없이 따라가면,
 * 공격자가 "우리사이트/auth/signin?callbackUrl=https://가짜사이트" 링크를 뿌려
 * 진짜 사이트에서 로그인한 사용자를 가짜 사이트로 보낼 수 있다(피싱).
 * 그래서 우리 사이트 안의 경로만 허용한다.
 *
 * [허용 규칙]
 * - '/cart', '/bookshelf?theme=garden' 같은 상대경로: 그대로 허용
 * - '//evil.com', '/\evil.com': 브라우저가 외부 주소로 해석하므로 차단
 * - 'http://우리사이트/mypage' 같은 절대 URL: origin(프로토콜+호스트+포트)이 같을 때만 경로+쿼리로 변환
 *   (proxy가 붙여 주는 callbackUrl은 절대 URL이라 이 경우가 필요하다)
 * - 그 외: '/'
 */
export function toSafeCallbackUrl(
    raw: string | null | undefined,
    origin?: string,
): string {
    if (!raw) return '/';
    if (
        raw.startsWith('/') &&
        !raw.startsWith('//') &&
        !raw.startsWith('/\\')
    ) {
        return raw;
    }
    if (origin) {
        try {
            const url = new URL(raw);
            if (url.origin === origin) return `${url.pathname}${url.search}`;
        } catch {
            // 잘못된 URL은 무시하고 기본값 사용
        }
    }
    return '/';
}
