/**
 * [임시] 관리자(점주) 이메일 판별
 *
 * TODO(db): 원래 권한은 DB User.role(MEMBER/ADMIN)에서 읽는다.
 * DB가 꺼져 있는 동안에는 환경변수 ADMIN_EMAILS(쉼표로 구분)에 적힌 이메일로
 * 로그인한 사람을 ADMIN으로 본다. DB를 켜면 이 함수와 ADMIN_EMAILS를 지운다.
 *
 * 예) ADMIN_EMAILS="owner@naver.com, staff@naver.com"
 * 대소문자·앞뒤 공백은 무시한다.
 */
export function isAdminEmail(
    email: string | null | undefined,
    adminEmails: string | undefined,
): boolean {
    if (!email || !adminEmails) return false;
    const target = email.trim().toLowerCase();
    return adminEmails
        .split(',')
        .map((value) => value.trim().toLowerCase())
        .some((value) => value !== '' && value === target);
}
