/**
 * [장바구니 페이지] 주소: /cart
 * Next.js는 app 폴더 구조로 주소를 정한다. (app/cart/page.tsx → /cart)
 * 이 파일은 서버에서 실행되며, 데이터를 준비해서 화면 컴포넌트(CartView)에 넘기기만 한다.
 */
import CartView from '@/domains/cart/components/CartView';
import { MOCK_CART_ITEMS } from '@/domains/cart/mocks/cartMock';

export default function CartPage() {
    // TODO: 장바구니는 localStorage/서버로 교체
    // 배송지(기본 배송지·내 연락처)는 로그인한 회원 기준으로 CartView 안에서 불러온다 (useCheckoutContact)
    return <CartView initialItems={MOCK_CART_ITEMS} />;
}
