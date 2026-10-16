/**
 * 헤더 회원 메뉴에 보여줄 이름과 아바타 글자
 *
 * - 이름: 세션의 name(네이버 이름, 없으면 별명) → 없으면 이메일 @ 앞부분 → 그것도 없으면 '회원'
 * - 아바타 글자: 이름의 첫 글자. 한글 한 글자·이모지도 깨지지 않도록 문자 단위(Array.from)로 자른다.
 */
export function getDisplayName(user: {
    name?: string | null;
    email?: string | null;
}): string {
    const name = user.name?.trim();
    if (name) return name;
    const emailId = user.email?.split('@')[0]?.trim();
    return emailId || '회원';
}

export function getAvatarInitial(displayName: string): string {
    return Array.from(displayName.trim())[0]?.toUpperCase() ?? '';
}
