/**
 * [결제창 열기] - 브라우저에서 실행
 * "N원 결제하기" 버튼을 누르면 CartView가 이 함수를 부른다.
 *
 * 순서
 * 1) 서버(/api/payments/ready)에 "무엇을 몇 권 살지"만 보내고, 주문번호·결제 금액을 받는다.
 *    (금액은 서버가 계산한다. 브라우저에서 금액을 조작해도 소용없게 하기 위해서)
 * 2) 토스 SDK를 불러와 결제창을 연다.
 * 3) 결제창에서 인증이 끝나면 토스가 브라우저를 이동시킨다.
 *    성공 → /cart/success?paymentKey=…&orderId=…&amount=…
 *    실패·취소 → /cart/fail?code=…&message=…
 */
import { CartItem, PaymentMethod } from '@/domains/cart/types/cart.types';
import { ANONYMOUS, loadTossPayments } from '@tosspayments/tosspayments-sdk';

// 결제하기 버튼: 서버에서 주문번호/금액을 받은 뒤 토스 결제창을 연다.
// 성공하면 /cart/success, 실패하거나 취소하면 /cart/fail로 이동한다.
export async function requestTossPayment(
    items: CartItem[],
    method: PaymentMethod,
) {
    // 클라이언트 키: 브라우저에 노출돼도 되는 키 (.env.local의 NEXT_PUBLIC_ 변수)
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    if (!clientKey) {
        throw new Error('.env.local에 NEXT_PUBLIC_TOSS_CLIENT_KEY가 없어요.');
    }

    // 1) 주문 준비: 선택된(품절 아닌) 상품의 ID와 수량만 서버로 보낸다
    const response = await fetch('/api/payments/ready', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            items: items
                .filter((item) => item.selected && !item.sold_out)
                .map(({ product_id, quantity }) => ({ product_id, quantity })),
        }),
    });
    const order = await response.json(); // { orderId, orderName, amount }
    if (!response.ok) throw new Error(order.message);

    // 2) 토스 SDK 불러오기 + 결제 객체 만들기
    const tossPayments = await loadTossPayments(clientKey);
    // TODO: 로그인 기능이 붙으면 회원 고유 ID(UUID)로 교체
    const payment = tossPayments.payment({ customerKey: ANONYMOUS });

    // 모든 결제 수단에 공통으로 들어가는 값
    const common = {
        amount: { currency: 'KRW', value: order.amount }, // 서버가 계산한 금액
        orderId: order.orderId, // 서버가 만든 주문번호
        orderName: order.orderName, // 결제창에 보이는 상품명 (예: 베란다 정원 일기 외 1건)
        successUrl: `${window.location.origin}/cart/success`, // 성공 시 이동할 주소
        failUrl: `${window.location.origin}/cart/fail`, // 실패·취소 시 이동할 주소
    };

    // 3) 결제 수단별로 결제창 열기
    if (method === 'virtual_account') {
        // 가상계좌 결제창
        // 문서용 테스트 키로는 가상계좌를 테스트할 수 없음 (내 테스트 키 필요)
        await payment.requestPayment({ ...common, method: 'VIRTUAL_ACCOUNT' });
        return;
    }

    // 카드·간편결제는 토스에서 모두 method: 'CARD'로 연다.
    // - 카드: flowMode 'DEFAULT' → 카드/간편결제 통합결제창
    // - 카카오페이·네이버페이: flowMode 'DIRECT' + easyPay 코드 → 해당 간편결제 창을 바로 연다
    const easyPay = { kakaopay: 'KAKAOPAY', naverpay: 'NAVERPAY' } as const;
    await payment.requestPayment({
        ...common,
        method: 'CARD',
        card:
            method === 'card'
                ? { flowMode: 'DEFAULT' }
                : { flowMode: 'DIRECT', easyPay: easyPay[method] },
    });
}
