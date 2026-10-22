import type {
    ProductListQuery,
    ProductSort,
} from '@/domains/products/types/product.types';

// 테마 서가(/bookshelf) 의 URL 쿼리 ↔ 목록 조회 조건 변환
// 예: /bookshelf?theme=table&page=2&soldout=hide&sort=price_asc

export const BOOKSHELF_PATH = '/bookshelf';

export const ALL_THEME_ID = 'all'; // '전체' 탭
export const DEFAULT_THEME_ID = 'garden'; // 주소에 theme 가 없으면 보여줄 서가

export const PRODUCT_SORT_OPTIONS: {
    value: ProductSort;
    label: string;
    hint: string; // 정렬 메뉴에 보여줄 한 줄 설명
}[] = [
    {
        value: 'recommended',
        label: '책방지기 추천순',
        hint: '책방지기가 먼저 건네고 싶은 순서',
    },
    { value: 'price_asc', label: '낮은 가격순', hint: '가볍게 한 권 들이고 싶을 때' },
    { value: 'price_desc', label: '높은 가격순', hint: '오래 곁에 둘 책을 찾을 때' },
    { value: 'title', label: '제목순', hint: '가나다 순서로 천천히' },
];

const SORTS = PRODUCT_SORT_OPTIONS.map((o) => o.value);

export const DEFAULT_BOOKSHELF_QUERY: ProductListQuery = {
    themeId: DEFAULT_THEME_ID,
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
    const theme = first(searchParams.theme);
    const page = Number.parseInt(first(searchParams.page) ?? '', 10);

    return {
        // 없는 테마인지는 페이지에서 테마 목록과 비교해서 걸러요.
        themeId: theme && /^[a-z-]+$/.test(theme) ? theme : DEFAULT_THEME_ID,
        hideSoldOut: first(searchParams.soldout) === 'hide',
        sort: sort && SORTS.includes(sort) ? sort : 'recommended',
        page: Number.isFinite(page) && page > 0 ? page : 1,
    };
}

// 기본값인 항목은 URL에서 빼서 주소를 짧게 유지합니다.
export function buildBookshelfHref(query: Partial<ProductListQuery>): string {
    const q = { ...DEFAULT_BOOKSHELF_QUERY, ...query };
    const params = new URLSearchParams();
    if (q.themeId !== DEFAULT_THEME_ID) params.set('theme', q.themeId);
    if (q.page > 1) params.set('page', String(q.page));
    if (q.hideSoldOut) params.set('soldout', 'hide');
    if (q.sort !== 'recommended') params.set('sort', q.sort);
    const qs = params.toString();
    return qs ? `${BOOKSHELF_PATH}?${qs}` : BOOKSHELF_PATH;
}
