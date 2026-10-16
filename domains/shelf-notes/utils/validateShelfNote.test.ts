import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { seasonOf, validateShelfNoteInput } from './validateShelfNote';

const valid = {
    entry_id: 'shelf-2026-10',
    content: '우산을 접는 법을 배운 책.',
    read_at: '2026-10-30',
    season: '가을',
};

describe('한 줄 메모 입력값 검사', () => {
    it('올바른 값이면 앞뒤 공백을 지우고 통과해야 한다', () => {
        const result = validateShelfNoteInput({
            ...valid,
            content: '  한 줄  ',
        });
        assert.deepStrictEqual(result, {
            ok: true,
            value: { ...valid, content: '한 줄' },
        });
    });

    it('내용이 비어 있으면 거절해야 한다', () => {
        assert.strictEqual(
            validateShelfNoteInput({ ...valid, content: '   ' }).ok,
            false,
        );
    });

    it('100자를 넘으면 거절하고, 딱 100자는 통과해야 한다', () => {
        assert.strictEqual(
            validateShelfNoteInput({ ...valid, content: '가'.repeat(101) }).ok,
            false,
        );
        assert.strictEqual(
            validateShelfNoteInput({ ...valid, content: '가'.repeat(100) }).ok,
            true,
        );
    });

    it('날짜 형식이나 계절이 틀리면 거절해야 한다', () => {
        assert.strictEqual(
            validateShelfNoteInput({ ...valid, read_at: '2026/10/30' }).ok,
            false,
        );
        assert.strictEqual(
            validateShelfNoteInput({ ...valid, season: '장마' }).ok,
            false,
        );
    });

    it('읽은 달로 계절을 추천해야 한다', () => {
        assert.strictEqual(seasonOf('2026-10-30'), '가을');
        assert.strictEqual(seasonOf('2026-05-30'), '봄');
        assert.strictEqual(seasonOf('2026-07-28'), '여름');
        assert.strictEqual(seasonOf('2026-01-02'), '겨울');
    });
});
