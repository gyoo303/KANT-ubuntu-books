import { LetterDraft } from '@/domains/letters/types/letter.types';

export const LETTER_TITLE_MAX_LENGTH = 40;
export const LETTER_CONTENT_MIN_LENGTH = 50;
export const LETTER_CONTENT_MAX_LENGTH = 1000;

// 편지를 우체통에 넣기 전 검사. 문제가 없으면 빈 배열을 돌려준다.
export function validateLetter(draft: LetterDraft): string[] {
    const errors: string[] = [];
    const title = draft.title.trim();
    const contentLength = draft.content.trim().length;

    if (title.length === 0) {
        errors.push('편지 제목을 적어주세요.');
    } else if (title.length > LETTER_TITLE_MAX_LENGTH) {
        errors.push(`제목은 ${LETTER_TITLE_MAX_LENGTH}자까지 쓸 수 있어요.`);
    }

    if (contentLength < LETTER_CONTENT_MIN_LENGTH) {
        errors.push(
            `본문은 최소 ${LETTER_CONTENT_MIN_LENGTH}자 이상 적어주세요.`,
        );
    } else if (contentLength > LETTER_CONTENT_MAX_LENGTH) {
        errors.push(`본문은 ${LETTER_CONTENT_MAX_LENGTH}자까지 쓸 수 있어요.`);
    }

    return errors;
}
