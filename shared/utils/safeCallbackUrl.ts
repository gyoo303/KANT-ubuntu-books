/**
 * 로그인 후 돌아갈 callbackUrl을 같은 사이트의 상대경로로만 제한한다 (Open Redirect 방지).
 * 절대 URL이면 origin이 같을 때만 경로+쿼리를 남기고, 그 외에는 '/'를 돌려준다.
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
