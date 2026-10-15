/**
 * [장바구니 금액 계산]
 * 장바구니 상품 목록을 받아 "몇 종 몇 권, 상품 금액, 배송비, 결제 금액"을 계산한다.
 * 화면(CartView)과 서버(결제 준비 API)가 같은 함수를 쓰기 때문에
 * 화면에 보이는 금액과 실제 결제 금액이 항상 같게 계산된다.
 */
import { CartItem, CartSummary } from '@/domains/cart/types/cart.types';

// 이 금액 이상이면 배송비 무료
export const FREE_SHIPPING_THRESHOLD = 30000;
export const SHIPPING_FEE = 3000; // TODO: 시안에 금액이 없어 임시로 정한 값, 팀과 확정 필요

// 선택되었고 품절이 아닌 상품만 주문 대상이다.
export function calculateCart(items: CartItem[]): CartSummary {
    // 1) 주문 대상만 골라낸다 (체크됨 + 품절 아님)
    const orderable = items.filter((item) => item.selected && !item.sold_out);

    // 2) 총 권수: 각 상품 수량을 모두 더한다
    const total_quantity = orderable.reduce(
        (sum, item) => sum + item.quantity,
        0,
    );
    // 3) 상품 금액: (가격 × 수량)을 모두 더한다
    const product_total = orderable.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    // 4) 배송비: 주문할 게 없거나(0원) 기준 금액 이상이면 무료, 아니면 배송비 부과
    const shipping_fee =
        product_total === 0 || product_total >= FREE_SHIPPING_THRESHOLD
            ? 0
            : SHIPPING_FEE;

    return {
        kind_count: orderable.length,
        total_quantity,
        product_total,
        shipping_fee,
        payment_total: product_total + shipping_fee,
    };
}
