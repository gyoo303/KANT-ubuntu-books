/**
 * 휴대폰 번호 입력 도우미
 * - formatPhoneNumber: 입력하는 대로 숫자만 남기고 하이픈을 넣는다 (01012345678 → 010-1234-5678)
 * - isValidPhoneNumber: 010·011·016·017·018·019로 시작하는 휴대폰 번호 형식인지 확인
 */
const PHONE_PATTERN = /^01[016789]-\d{3,4}-\d{4}$/;

export function formatPhoneNumber(input: string): string {
    const digits = input.replace(/\D/g, '').slice(0, 11);
    if (digits.length < 4) return digits;
    if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    // 10자리(011-123-4567)는 3-3-4, 11자리(010-1234-5678)는 3-4-4
    const middle = digits.length === 10 ? 6 : 7;
    return `${digits.slice(0, 3)}-${digits.slice(3, middle)}-${digits.slice(middle)}`;
}

export function isValidPhoneNumber(value: string): boolean {
    return PHONE_PATTERN.test(value);
}
