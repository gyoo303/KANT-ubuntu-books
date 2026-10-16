import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { formatPhoneNumber, isValidPhoneNumber } from './phone';

describe('formatPhoneNumber 유틸리티 함수 테스트', () => {
    it('입력 중인 숫자에 하이픈을 단계별로 넣어야 한다', () => {
        assert.strictEqual(formatPhoneNumber('010'), '010');
        assert.strictEqual(formatPhoneNumber('0101'), '010-1');
        assert.strictEqual(formatPhoneNumber('0101234'), '010-1234');
        assert.strictEqual(formatPhoneNumber('01012345678'), '010-1234-5678');
    });

    it('10자리 번호는 3-3-4로 나눠야 한다', () => {
        assert.strictEqual(formatPhoneNumber('0111234567'), '011-123-4567');
    });

    it('숫자가 아닌 문자는 지우고 11자리까지만 남겨야 한다', () => {
        assert.strictEqual(formatPhoneNumber('010-1234-5678'), '010-1234-5678');
        assert.strictEqual(
            formatPhoneNumber('010 1234 56789'),
            '010-1234-5678',
        );
        assert.strictEqual(formatPhoneNumber('abc'), '');
    });
});

describe('isValidPhoneNumber 유틸리티 함수 테스트', () => {
    it('올바른 휴대폰 번호 형식이면 true를 돌려줘야 한다', () => {
        assert.strictEqual(isValidPhoneNumber('010-1234-5678'), true);
        assert.strictEqual(isValidPhoneNumber('011-123-4567'), true);
    });

    it('형식이 틀리면 false를 돌려줘야 한다', () => {
        assert.strictEqual(isValidPhoneNumber('01012345678'), false);
        assert.strictEqual(isValidPhoneNumber('010-1234'), false);
        assert.strictEqual(isValidPhoneNumber('02-123-4567'), false);
        assert.strictEqual(isValidPhoneNumber(''), false);
    });
});
