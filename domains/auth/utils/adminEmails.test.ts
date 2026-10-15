import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { isAdminEmail } from './adminEmails';

describe('isAdminEmail 유틸리티 함수 테스트', () => {
    it('ADMIN_EMAILS 목록에 있는 이메일이면 true를 돌려줘야 한다', () => {
        assert.strictEqual(
            isAdminEmail('owner@naver.com', 'owner@naver.com,staff@naver.com'),
            true,
        );
    });

    it('대소문자와 앞뒤 공백은 무시해야 한다', () => {
        assert.strictEqual(
            isAdminEmail(
                ' Owner@Naver.com ',
                ' staff@naver.com , OWNER@naver.com ',
            ),
            true,
        );
    });

    it('목록에 없거나 값이 비어 있으면 false를 돌려줘야 한다', () => {
        assert.strictEqual(
            isAdminEmail('reader@naver.com', 'owner@naver.com'),
            false,
        );
        assert.strictEqual(isAdminEmail('owner@naver.com', undefined), false);
        assert.strictEqual(isAdminEmail('owner@naver.com', ''), false);
        assert.strictEqual(isAdminEmail(null, 'owner@naver.com'), false);
        assert.strictEqual(isAdminEmail('', ', ,'), false);
    });
});
