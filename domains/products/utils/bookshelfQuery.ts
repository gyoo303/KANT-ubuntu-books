import type {
    ProductListQuery,
    ProductSort,
} from '@/domains/products/types/product.types';

// 테마 서가(/) 의 URL 쿼리 ↔ 목록 조회 조건 변환
// 예: /?page=2&soldout=hide&sort=price_asc

export const BOOKSHELF_PATH = '/';

export const PRODUCT_SORT_OPTIONS: { value: ProductSort; label: string }[] = [
    { value: 'recommended', label: '책방지기 추천순' },
    { value: 'price_asc', label: '낮은 가격순' },
    { value: 'price_desc', label: '높은 가격순' },
    { value: 'title', label: '제목순' },
];

const SORTS = PRODUCT_SORT_OPTIONS.map((o) => o.value);

export const DEFAULT_BOOKSHELF_QUERY: ProductListQuery = {
    hideSoldOut: false,
    sort: 'recommended',
    page: 1,
};

type SearchParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

export function parseBookshelfQuery(
    searchParams: SearchParams,
): ProductListQuery {
    const sort = first(searchParams.sort) as ProductSort | undefined;
    const page = Number.parseInt(first(searchParams.page) ?? '', 10);

    return {
        hideSoldOut: first(searchParams.soldout) === 'hide',
        sort: sort && SORTS.includes(sort) ? sort : 'recommended',
        page: Number.isFinite(page) && page > 0 ? page : 1,
    };
}

// 기본값인 항목은 URL에서 빼서 주소를 짧게 유지합니다.
export function buildBookshelfHref(query: Partial<ProductListQuery>): string {
    const q = { ...DEFAULT_BOOKSHELF_QUERY, ...query };
    const params = new URLSearchParams();
    if (q.page > 1) params.set('page', String(q.page));
    if (q.hideSoldOut) params.set('soldout', 'hide');
    if (q.sort !== 'recommended') params.set('sort', q.sort);
    const qs = params.toString();
    return qs ? `${BOOKSHELF_PATH}?${qs}` : BOOKSHELF_PATH;
}
