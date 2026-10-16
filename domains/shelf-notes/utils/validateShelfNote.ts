import type {
    Season,
    ShelfNoteInput,
} from '@/domains/shelf-notes/types/shelfNote.types';

export const SEASONS: Season[] = ['봄', '여름', '가을', '겨울'];
export const SHELF_NOTE_MAX_LENGTH = 100;

type ValidationResult =
    { ok: true; value: ShelfNoteInput } | { ok: false; error: string };

// 한 줄 메모 입력값 검사 (API와 화면에서 같이 써요)
export function validateShelfNoteInput(input: unknown): ValidationResult {
    if (typeof input !== 'object' || input === null) {
        return { ok: false, error: '보낸 값이 올바르지 않아요.' };
    }
    const { entry_id, content, read_at, season } = input as Record<
        string,
        unknown
    >;

    if (typeof entry_id !== 'string' || entry_id.trim() === '') {
        return { ok: false, error: '어떤 책에 남기는 메모인지 알 수 없어요.' };
    }
    if (typeof content !== 'string' || content.trim() === '') {
        return { ok: false, error: '한 줄을 적어 주세요.' };
    }
    const text = content.trim();
    if ([...text].length > SHELF_NOTE_MAX_LENGTH) {
        return {
            ok: false,
            error: `한 줄은 ${SHELF_NOTE_MAX_LENGTH}자까지 남길 수 있어요.`,
        };
    }
    if (
        typeof read_at !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(read_at) ||
        Number.isNaN(Date.parse(read_at))
    ) {
        return { ok: false, error: '읽은 날짜가 올바르지 않아요.' };
    }
    if (typeof season !== 'string' || !SEASONS.includes(season as Season)) {
        return { ok: false, error: '계절을 골라 주세요.' };
    }

    return {
        ok: true,
        value: { entry_id, content: text, read_at, season: season as Season },
    };
}

// 읽은 날짜로 계절 추천 (3~5월 봄, 6~8월 여름, 9~11월 가을, 12~2월 겨울)
export function seasonOf(date: string): Season {
    const month = Number(date.slice(5, 7));
    if (month >= 3 && month <= 5) return '봄';
    if (month >= 6 && month <= 8) return '여름';
    if (month >= 9 && month <= 11) return '가을';
    return '겨울';
}
