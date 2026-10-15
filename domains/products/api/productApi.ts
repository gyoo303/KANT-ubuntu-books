import type {
    Product,
    ProductListQuery,
    ProductListResult,
    ProductSort,
    Theme,
} from '@/domains/products/types/product.types';
import { MOCK_PRODUCTS, MOCK_THEMES } from '@/shared/mocks/mockData';

// 테마 서가 / 도서 데이터 접근 함수
// 지금은 Mock Data를 쓰고, 백엔드 API(GET /api/v1/products 등)가 나오면 이 파일 안쪽만 fetch로 바꾸면 됩니다.

export const PRODUCTS_PER_PAGE = 9;

const sorters: Record<ProductSort, (a: Product, b: Product) => number> = {
    recommended: (a, b) => a.sort_order - b.sort_order,
    price_asc: (a, b) => a.price - b.price,
    price_desc: (a, b) => b.price - a.price,
    title: (a, b) => a.title.localeCompare(b.title, 'ko'),
};

// 탭에 보여줄 테마 목록 (표시용)
export async function getThemes(): Promise<Theme[]> {
    return [...MOCK_THEMES].sort((a, b) => a.sort_order - b.sort_order);
}

// 실제로 보여주는 서가는 '도심 속 텃밭과 흙' 하나예요.
export async function getShelfTheme(): Promise<Theme> {
    return MOCK_THEMES.find((t) => t.id === 'garden')!;
}

export async function getTheme(themeId: string): Promise<Theme | null> {
    return MOCK_THEMES.find((t) => t.id === themeId) ?? null;
}

export async function getProducts(
    query: ProductListQuery,
): Promise<ProductListResult> {
    let list = MOCK_PRODUCTS;
    if (query.hideSoldOut) list = list.filter((p) => p.stock > 0);
    list = [...list].sort(sorters[query.sort]);

    const totalPages = Math.max(1, Math.ceil(list.length / PRODUCTS_PER_PAGE));
    const page = Math.min(Math.max(1, query.page), totalPages);

    return {
        items: list.slice(
            (page - 1) * PRODUCTS_PER_PAGE,
            page * PRODUCTS_PER_PAGE,
        ),
        totalCount: list.length,
        page,
        totalPages,
    };
}

export async function getProduct(id: string): Promise<Product | null> {
    return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
}

export async function getProductIds(): Promise<string[]> {
    return MOCK_PRODUCTS.map((p) => p.id);
}

// 서가의 다른 책 (추천순 상위 N권)
export async function getRelatedProducts(
    product: Product,
    limit = 4,
): Promise<Product[]> {
    return MOCK_PRODUCTS.filter((p) => p.id !== product.id)
        .sort(sorters.recommended)
        .slice(0, limit);
}
