import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { toSafeCallbackUrl } from './safeCallbackUrl';

describe('toSafeCallbackUrl 유틸리티 함수 테스트', () => {
    it('같은 사이트의 상대경로는 쿼리스트링까지 그대로 돌려줘야 한다', () => {
        assert.strictEqual(toSafeCallbackUrl('/cart'), '/cart');
        assert.strictEqual(
            toSafeCallbackUrl('/bookshelf?theme=garden'),
            '/bookshelf?theme=garden',
        );
    });

    it('값이 없으면 "/"를 돌려줘야 한다', () => {
        assert.strictEqual(toSafeCallbackUrl(undefined), '/');
        assert.strictEqual(toSafeCallbackUrl(null), '/');
        assert.strictEqual(toSafeCallbackUrl(''), '/');
    });

    it('외부 사이트로 향하는 주소는 "/"로 막아야 한다', () => {
        assert.strictEqual(toSafeCallbackUrl('https://evil.com/cart'), '/');
        assert.strictEqual(toSafeCallbackUrl('//evil.com'), '/');
        assert.strictEqual(toSafeCallbackUrl('/\\evil.com'), '/');
        assert.strictEqual(
            toSafeCallbackUrl('https://evil.com/cart', 'http://localhost:3000'),
            '/',
        );
    });

    it('origin이 같은 절대 URL은 경로+쿼리만 남겨야 한다', () => {
        assert.strictEqual(
            toSafeCallbackUrl(
                'http://localhost:3000/mypage?tab=1',
                'http://localhost:3000',
            ),
            '/mypage?tab=1',
        );
    });
});
