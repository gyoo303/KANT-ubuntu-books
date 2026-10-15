/**
 * [결제 준비 API] POST /api/payments/ready - 서버에서 실행
 * 결제창을 열기 직전에 브라우저(requestTossPayment)가 호출한다.
 *
 * 요청: { items: [{ product_id, quantity }, ...], shippingAddress: { recipient, phone, address } }
 *       ← 가격은 받지 않는다. shippingAddress.phone = 받는 분 연락처(receiverPhone)
 * 응답: { orderId, orderName, amount }
 *
 * 하는 일
 * 0) 로그인 확인(주문·결제는 회원 전용, 명세서 2.2) + 배송지 검증(화면과 같은 규칙)
 * 1) 상품 ID로 서버의 가격표(지금은 더미데이터)에서 가격·품절 여부를 찾는다.
 * 2) calculateCart()로 결제 금액을 계산한다. (화면과 같은 계산 함수)
 * 3) 주문번호를 만들고 금액을 임시 저장소에 기억해 둔다. (승인할 때 비교용)
 */
import { auth } from '@/auth';
import { MOCK_CART_ITEMS } from '@/domains/cart/mocks/cartMock';
import { ShippingAddress } from '@/domains/cart/types/cart.types';
import { validateShippingAddress } from '@/domains/checkout/utils/validateShippingAddress';
import { calculateCart } from '@/domains/cart/utils/calculateCart';
import { savePendingOrder } from '@/domains/payments/server/pendingOrders';

// 브라우저가 보내는 요청 본문 모양
interface ReadyRequest {
    items: { product_id: string; quantity: number }[];
    shippingAddress?: ShippingAddress;
}

// 결제 요청 전에 호출: 서버가 가격을 직접 계산해 주문번호와 금액을 정한다.
// 브라우저가 보낸 가격은 믿지 않고 상품 ID와 수량만 받는다.
export async function POST(request: Request) {
    // 0) 회원만 주문할 수 있다. API는 proxy에서 막지 않으므로 여기서 직접 확인한다.
    const session = await auth();
    if (!session?.user?.id) {
        return Response.json(
            { message: '로그인이 필요해요.' },
            { status: 401 },
        );
    }

    const { items, shippingAddress } = (await request.json()) as ReadyRequest;

    // 0) 배송지 검증: 받는 분 연락처(receiverPhone)는 결제 화면에서 받는다 (가입 때 받지 않음)
    const addressErrors = validateShippingAddress(shippingAddress);
    const firstAddressError = Object.values(addressErrors)[0];
    if (firstAddressError) {
        return Response.json({ message: firstAddressError }, { status: 400 });
    }

    // 1) 상품 ID로 가격표에서 상품을 찾는다.
    //    없는 상품이거나 수량이 이상하면(소수, 0 이하) 빼 버린다. (flatMap에서 [] 반환 = 제외)
    // TODO: 상품 가격/품절 여부는 DB에서 조회
    const ordered = items.flatMap(({ product_id, quantity }) => {
        const product = MOCK_CART_ITEMS.find(
            (item) => item.product_id === product_id,
        );
        if (!product || !Number.isInteger(quantity) || quantity < 1) return [];
        return [{ ...product, quantity, selected: true }];
    });

    // 2) 금액 계산 (품절 상품은 여기서 자동으로 빠진다)
    const summary = calculateCart(ordered);
    if (summary.kind_count === 0) {
        return Response.json(
            { message: '주문할 수 있는 상품이 없어요.' },
            { status: 400 },
        );
    }

    // 3) 주문번호(무작위 UUID) 발급 + 금액 저장
    // TODO(db): 주문 테이블에 저장할 때 함께 기록한다.
    //   - Order.userId = session.user.id (주문자)
    //   - Order.shippingAddress = { receiverName: recipient, receiverPhone: phone, address1: address, ... }
    //   - 사용자가 "내 연락처로 저장"을 골랐다면 User.phone도 갱신 (지금은 화면에서 LocalStorage에 임시 저장)
    const orderId = crypto.randomUUID();
    savePendingOrder(orderId, summary.payment_total);

    // 결제창에 보일 상품명: "첫 상품 외 N건" 또는 상품이 하나면 그 제목
    const first = ordered.find((item) => !item.sold_out)!;
    const orderName =
        summary.kind_count > 1
            ? `${first.title} 외 ${summary.kind_count - 1}건`
            : first.title;

    return Response.json({
        orderId,
        orderName,
        amount: summary.payment_total,
    });
}
