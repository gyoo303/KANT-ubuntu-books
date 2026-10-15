import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validateLetter } from './validateLetter';

const CONTENT_50 = '가'.repeat(50);

describe('validateLetter 편지 검사 함수 테스트', () => {
    it('제목이 있고 본문이 50자 이상이면 에러가 없어야 한다', () => {
        const errors = validateLetter({
            title: '요즘은 비 오는 날이 좋아요',
            content: CONTENT_50,
            mood_tags: [],
        });
        assert.deepStrictEqual(errors, []);
    });

    it('제목이 공백뿐이면 제목 에러를 돌려줘야 한다', () => {
        const errors = validateLetter({
            title: '   ',
            content: CONTENT_50,
            mood_tags: [],
        });
        assert.deepStrictEqual(errors, ['편지 제목을 적어주세요.']);
    });

    it('본문이 50자 미만이면 최소 글자 수 에러를 돌려줘야 한다', () => {
        const errors = validateLetter({
            title: '제목',
            content: '가'.repeat(49),
            mood_tags: [],
        });
        assert.deepStrictEqual(errors, ['본문은 최소 50자 이상 적어주세요.']);
    });

    it('본문이 1000자를 넘으면 최대 글자 수 에러를 돌려줘야 한다', () => {
        const errors = validateLetter({
            title: '제목',
            content: '가'.repeat(1001),
            mood_tags: [],
        });
        assert.deepStrictEqual(errors, ['본문은 1000자까지 쓸 수 있어요.']);
    });
});
