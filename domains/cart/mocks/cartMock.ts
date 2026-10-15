/**
 * [장바구니 더미데이터]
 * 백엔드/DB가 없는 동안 화면과 서버 API가 쓰는 가짜 데이터.
 * - MOCK_CART_ITEMS: 장바구니 화면에 처음 보이는 상품 + 결제 준비 API의 "가격표" 역할
 * - MOCK_DEFAULT_ADDRESS: 배송지의 "기본 배송지" 탭에 보이는 주소
 * TODO: 장바구니는 localStorage/서버, 가격은 DB, 배송지는 회원 정보로 교체
 */
import { CartItem, ShippingAddress } from '@/domains/cart/types/cart.types';

// 회원의 기본 배송지 (시안 06의 값)
export const MOCK_DEFAULT_ADDRESS: ShippingAddress = {
    recipient: '윤슬',
    phone: '010-0000-0000',
    address: '(34000) 대전광역시 유성구 ○○로 00, ○○동 ○○호',
};

// 장바구니 시안(05)과 같은 구성: 정상 2종 + 품절 1종
export const MOCK_CART_ITEMS: CartItem[] = [
    {
        product_id: 'book-veranda-garden',
        title: '베란다 정원 일기',
        author: '○○○',
        publisher: '○○출판',
        theme: '도심 속 텃밭과 흙',
        cover_color: '#4a5a52',
        price: 16800,
        quantity: 1,
        selected: true,
        sold_out: false,
    },
    {
        product_id: 'book-seasonal-table',
        title: '제철 밥상 노트',
        author: '○○○',
        publisher: '○○출판',
        theme: '치유의 식탁',
        cover_color: '#8a4a2c',
        price: 18000,
        quantity: 2,
        selected: true,
        sold_out: false,
    },
    {
        // 품절 상품: 화면에서 흐리게 보이고 선택할 수 없다
        product_id: 'book-village-garden',
        title: '마을 텃밭 사계',
        author: '○○○',
        publisher: '○○출판',
        theme: '도심 속 텃밭과 흙',
        cover_color: '#9ca69a',
        price: 15000,
        quantity: 1,
        selected: false,
        sold_out: true,
    },
];
