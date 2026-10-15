// 테마 서가 (예: 도심 속 텃밭과 흙)
export type ThemeIcon = 'sprout' | 'soup' | 'leaf' | 'map-pin';

export interface Theme {
    id: string; // URL 쿼리에 쓰이는 슬러그 (예: garden)
    name: string; // 탭·상세 칩에 쓰는 이름
    short_name: string; // 카드 상단 라벨
    description: string;
    icon: ThemeIcon;
    sort_order: number;
}

// 도서 상품
export interface Product {
    id: string;
    theme_id: string;
    title: string;
    author: string;
    publisher: string;
    price: number;
    stock: number; // 0이면 품절
    one_line: string; // 목록 카드의 한 줄 소개
    curator_note: string; // 책방지기 노트
    pairing_note: string | null; // 페어링 (없으면 null)
    publisher_intro: string; // 출판사 책 소개
    published_at: string; // YYYY-MM-DD
    page_count: number;
    size: string; // 판형 (예: 130×200mm)
    isbn: string;
    cover_image_url: string | null; // 실제 표지 이미지가 생기기 전까지 null
    cover_color: string; // 표지 이미지가 없을 때 쓰는 색
    sort_order: number; // 책방지기 추천순
}

export type ProductSort = 'recommended' | 'price_asc' | 'price_desc' | 'title';

export interface ProductListQuery {
    themeId: string | null; // null이면 전체
    hideSoldOut: boolean;
    sort: ProductSort;
    page: number;
}

export interface ProductListResult {
    items: Product[];
    totalCount: number;
    page: number;
    totalPages: number;
}
