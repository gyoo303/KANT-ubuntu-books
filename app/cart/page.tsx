/**
 * [장바구니 페이지] 주소: /cart (로그인 후 돌아올 때는 /cart?step=checkout)
 * Next.js는 app 폴더 구조로 주소를 정한다. (app/cart/page.tsx → /cart)
 * 이 파일은 서버에서 실행되며, 데이터를 준비해서 화면 컴포넌트(CartView)에 넘기기만 한다.
 *
 * ?step=checkout
 * 비회원이 "구매 계속하기"를 누르면 로그인 화면으로 갔다가 이 주소로 돌아온다.
 * 그러면 "구매 계속하기"를 다시 누르지 않아도 바로 주문결제(배송지·결제 수단) 단계가 펼쳐진다.
 *
 * Suspense를 쓰는 이유: cacheComponents: true라서 요청마다 달라지는 searchParams 읽기는
 * <Suspense> 안에서 해야 한다. 그동안은 기본 장바구니 화면(fallback)이 먼저 보인다.
 */
import CartView, { type CartStep } from '@/domains/cart/components/CartView';
import { MOCK_CART_ITEMS } from '@/domains/cart/mocks/cartMock';
import { Suspense } from 'react';

// 주소의 ?뒤 값들 (Next 16에서는 Promise로 들어온다)
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function CartPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    // TODO: 장바구니는 localStorage/서버로 교체
    // 배송지(기본 배송지·내 연락처)는 로그인한 회원 기준으로 CartView 안에서 불러온다 (useCheckoutContact)
    return (
        <Suspense fallback={<CartView initialItems={MOCK_CART_ITEMS} />}>
            <CartWithStep searchParams={searchParams} />
        </Suspense>
    );
}

async function CartWithStep({ searchParams }: { searchParams: SearchParams }) {
    const { step } = await searchParams;
    const initialStep: CartStep = step === 'checkout' ? 'checkout' : 'cart';
    return (
        <CartView initialItems={MOCK_CART_ITEMS} initialStep={initialStep} />
    );
}
