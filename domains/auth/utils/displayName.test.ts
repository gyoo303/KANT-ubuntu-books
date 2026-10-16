import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getAvatarInitial, getDisplayName } from './displayName';

describe('getDisplayName 유틸리티 함수 테스트', () => {
    it('이름이 있으면 이름을 돌려줘야 한다', () => {
        assert.strictEqual(
            getDisplayName({ name: ' 윤슬 ', email: 'a@naver.com' }),
            '윤슬',
        );
    });

    it('이름이 없으면 이메일 @ 앞부분, 그것도 없으면 "회원"을 돌려줘야 한다', () => {
        assert.strictEqual(
            getDisplayName({ name: '', email: 'reader@naver.com' }),
            'reader',
        );
        assert.strictEqual(getDisplayName({ name: null, email: null }), '회원');
    });
});

describe('getAvatarInitial 유틸리티 함수 테스트', () => {
    it('이름의 첫 글자를 돌려줘야 한다', () => {
        assert.strictEqual(getAvatarInitial('윤슬'), '윤');
        assert.strictEqual(getAvatarInitial('reader'), 'R');
    });

    it('이모지처럼 두 칸짜리 문자도 깨지지 않아야 한다', () => {
        assert.strictEqual(getAvatarInitial('🌿숲'), '🌿');
        assert.strictEqual(getAvatarInitial(''), '');
    });
});
