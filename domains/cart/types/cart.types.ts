/**
 * [장바구니 타입 정의]
 * 장바구니·배송지·결제 수단·금액 요약에서 쓰는 데이터 모양을 정해 두는 파일.
 * 실제 동작 코드는 없고, 다른 파일들이 이 타입을 가져다 쓴다.
 */

// 장바구니에 담긴 상품 한 줄
export interface CartItem {
    product_id: string; // 상품 고유 ID (서버에서 가격을 찾을 때 사용)
    title: string; // 책 제목
    author: string; // 저자
    publisher: string; // 출판사
    theme: string; // 테마 (예: 도심 속 텃밭과 흙)
    cover_color: string; // 표지 대신 보여주는 색 (이미지가 생기면 교체)
    price: number; // 1권 가격
    quantity: number; // 담은 수량
    selected: boolean; // 체크박스 선택 여부 (선택된 것만 주문)
    sold_out: boolean; // 품절 여부 (품절이면 선택·주문 불가)
}

// 배송지 정보 (DB 스키마 shippingAddress의 receiverName / receiverPhone / address1에 해당)
export interface ShippingAddress {
    recipient: string; // 받는 분
    phone: string; // 받는 분 연락처 (receiverPhone). 회원 본인 연락처(User.phone)와는 별개
    address: string; // 주소
}

// 결제 수단 (결제 수단 버튼 4개와 1:1로 대응)
export type PaymentMethod =
    'card' | 'kakaopay' | 'naverpay' | 'virtual_account';

// calculateCart()가 돌려주는 주문 금액 요약
export interface CartSummary {
    kind_count: number; // 주문할 상품 종류 수 (예: 2종)
    total_quantity: number; // 주문할 총 권수 (예: 3권)
    product_total: number; // 상품 금액 합계
    shipping_fee: number; // 배송비
    payment_total: number; // 최종 결제 금액 (상품 금액 + 배송비)
}
