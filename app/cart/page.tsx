/**
 * [장바구니 페이지] 주소: /cart
 * Next.js는 app 폴더 구조로 주소를 정한다. (app/cart/page.tsx → /cart)
 * 이 파일은 서버에서 실행되며, 데이터를 준비해서 화면 컴포넌트(CartView)에 넘기기만 한다.
 */
import CartView from '@/domains/cart/components/CartView';
import {
    MOCK_CART_ITEMS,
    MOCK_DEFAULT_ADDRESS,
} from '@/domains/cart/mocks/cartMock';

export default function CartPage() {
    // TODO: 장바구니는 localStorage/서버, 배송지는 회원 정보로 교체
    return (
        <CartView
            initialItems={MOCK_CART_ITEMS}
            defaultAddress={MOCK_DEFAULT_ADDRESS}
        />
    );
}
