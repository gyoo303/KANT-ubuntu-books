/**
 * [장바구니 금액 계산 테스트]
 * calculateCart()가 여러 상황에서 금액을 맞게 계산하는지 자동으로 확인한다.
 * 실행: node --import tsx --test domains/cart/utils/calculateCart.test.ts
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { CartItem } from '../types/cart.types';
import { calculateCart, SHIPPING_FEE } from './calculateCart';

// 테스트용 상품을 쉽게 만드는 도우미: 기본값(10,000원, 1권, 선택됨, 재고 있음)에서
// 테스트마다 필요한 값만 덮어쓴다. 예) item({ price: 16800 })
const item = (overrides: Partial<CartItem>): CartItem => ({
    product_id: 'p',
    title: '테스트 책',
    author: '저자',
    publisher: '출판사',
    theme: '테마',
    cover_color: '#000000',
    price: 10000,
    quantity: 1,
    selected: true,
    sold_out: false,
    ...overrides,
});

describe('calculateCart 장바구니 계산 테스트', () => {
    // 시안(05) 화면의 숫자와 똑같이 나오는지 확인
    it('시안 예시(16,800원 1권 + 18,000원 2권 + 품절 1종)는 2종 3권, 52,800원, 배송비 무료여야 한다', () => {
        const result = calculateCart([
            item({ product_id: 'a', price: 16800, quantity: 1 }),
            item({ product_id: 'b', price: 18000, quantity: 2 }),
            item({
                product_id: 'c',
                price: 15000,
                quantity: 1,
                selected: false,
                sold_out: true,
            }),
        ]);
        assert.deepStrictEqual(result, {
            kind_count: 2,
            total_quantity: 3,
            product_total: 52800,
            shipping_fee: 0,
            payment_total: 52800,
        });
    });

    // 품절 상품은 체크되어 있어도 빠져야 한다
    it('품절 상품은 선택되어 있어도 금액에 포함하지 않아야 한다', () => {
        const result = calculateCart([
            item({ price: 40000 }),
            item({ price: 15000, sold_out: true }),
        ]);
        assert.strictEqual(result.kind_count, 1);
        assert.strictEqual(result.product_total, 40000);
    });

    // 체크를 푼 상품은 빠져야 한다
    it('선택 해제된 상품은 금액에 포함하지 않아야 한다', () => {
        const result = calculateCart([
            item({ price: 40000 }),
            item({ price: 20000, selected: false }),
        ]);
        assert.strictEqual(result.product_total, 40000);
    });

    // 배송비 경계값: 29,999원 → 배송비 붙음
    it('30,000원 미만이면 배송비가 붙어야 한다', () => {
        const result = calculateCart([item({ price: 29999 })]);
        assert.strictEqual(result.shipping_fee, SHIPPING_FEE);
        assert.strictEqual(result.payment_total, 29999 + SHIPPING_FEE);
    });

    // 배송비 경계값: 정확히 30,000원 → 무료
    it('정확히 30,000원이면 배송비가 무료여야 한다', () => {
        const result = calculateCart([item({ price: 30000 })]);
        assert.strictEqual(result.shipping_fee, 0);
    });

    // 아무것도 선택하지 않으면 배송비도 0원이어야 한다 (0원인데 배송비만 붙는 버그 방지)
    it('주문할 상품이 없으면 모든 값이 0이어야 한다', () => {
        const result = calculateCart([item({ selected: false })]);
        assert.deepStrictEqual(result, {
            kind_count: 0,
            total_quantity: 0,
            product_total: 0,
            shipping_fee: 0,
            payment_total: 0,
        });
    });
});
