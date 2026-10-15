import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
    isShippingAddressValid,
    validateShippingAddress,
} from './validateShippingAddress';

const VALID = {
    recipient: '윤슬',
    phone: '010-1234-5678',
    address: '대전광역시 유성구 어은로 00',
};

describe('validateShippingAddress 유틸리티 함수 테스트', () => {
    it('모두 올바르게 입력하면 오류가 없어야 한다', () => {
        assert.deepStrictEqual(validateShippingAddress(VALID), {});
        assert.strictEqual(isShippingAddressValid(VALID), true);
    });

    it('비어 있거나 형식이 틀린 칸마다 오류 문구를 돌려줘야 한다', () => {
        const errors = validateShippingAddress({
            recipient: '  ',
            phone: '01012345678',
            address: '',
        });
        assert.deepStrictEqual(Object.keys(errors).sort(), [
            'address',
            'phone',
            'recipient',
        ]);
    });

    it('문자열이 아닌 값(조작된 요청)도 오류 없이 걸러야 한다', () => {
        const tampered = {
            recipient: 1,
            phone: ['010-1234-5678'],
            address: {},
        };
        assert.strictEqual(
            Object.keys(validateShippingAddress(tampered as never)).length,
            3,
        );
    });

    it('값이 아예 없으면 유효하지 않아야 한다', () => {
        assert.strictEqual(isShippingAddressValid(null), false);
        assert.strictEqual(isShippingAddressValid({}), false);
    });
});
