import { getProducts, getThemes } from '@/domains/products/api/productApi';
import BookshelfPagination from '@/domains/products/components/BookshelfPagination';
import BookshelfShell from '@/domains/products/components/BookshelfShell';
import BookshelfToolbar from '@/domains/products/components/BookshelfToolbar';
import ProductCard from '@/domains/products/components/ProductCard';
import ThemeTabs from '@/domains/products/components/ThemeTabs';
import {
    ALL_THEME_ID,
    DEFAULT_THEME_ID,
    parseBookshelfQuery,
} from '@/domains/products/utils/bookshelfQuery';
import { Suspense } from 'react';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// '전체' 탭을 골랐을 때 보여줄 소개
const ALL_SHELVES = {
    name: '모든 서가',
    short_name: '모든 서가',
    description:
        '네 개의 테마 서가에 꽂힌 책을 한곳에 모았어요. 마음이 가는 테마를 골라 천천히 둘러보세요.',
};

const GARDEN_DISPLAY_COUNT = 24; // 텃밭 서가에 보여줄 책 수 (디자인 시안 기준 고정 값)

// [SHP-01] 테마 서가 목록 (테마 탭 · 정렬 · 품절 제외 · 페이지네이션)
export default function BookshelfPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    return (
        <BookshelfShell>
            {/* 페이지 머리말: 주소와 상관없이 항상 같아서 미리 만들어 둬요 */}
            <section className="pt-14 md:pt-[78px]">
                <p className="text-ink-2 text-[15px] font-medium tracking-[0.08em]">
                    CURATED SHELVES · /bookshelf
                </p>
                <h1 className="mt-3 text-[32px] leading-tight font-medium md:text-[40px]">
                    테마 서가
                </h1>
                <p className="text-ink-2 mt-3 text-[15px]">
                    장르 대신 마음이 머무는 곳으로 책을 나눴어요.
                </p>
            </section>

            {/* 주소(?theme=, ?sort=, ?page=)에 따라 바뀌는 부분은 Suspense 안에서 읽어요 */}
            <Suspense fallback={<BookshelfSkeleton />}>
                <BookshelfContent searchParams={searchParams} />
            </Suspense>
        </BookshelfShell>
    );
}

async function BookshelfContent({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const themes = await getThemes();
    const parsed = parseBookshelfQuery(await searchParams);
    // 없는 테마(?theme=abc)면 기본 서가로 보여줘요.
    const known =
        parsed.themeId === ALL_THEME_ID ||
        themes.some((t) => t.id === parsed.themeId);
    const query = known ? parsed : { ...parsed, themeId: DEFAULT_THEME_ID };

    const theme =
        query.themeId === ALL_THEME_ID
            ? { id: ALL_THEME_ID, ...ALL_SHELVES }
            : themes.find((t) => t.id === query.themeId)!;
    const shortNames = new Map(themes.map((t) => [t.id, t.short_name]));

    const { items, totalCount, totalPages } = await getProducts(query);
    const displayCount =
        query.themeId === DEFAULT_THEME_ID ? GARDEN_DISPLAY_COUNT : totalCount;

    return (
        <>
            <div className="border-line border-b pb-7">
                <ThemeTabs themes={themes} query={query} />
            </div>

            {/* 선택된 테마 소개 */}
            <section className="grid items-center gap-6 py-10 md:grid-cols-[1fr_360px] md:gap-16">
                <div>
                    <h2 className="text-[28px] font-medium">{theme.name}</h2>
                    <p className="text-ink-2 mt-4 max-w-[680px] text-[14.5px] leading-[2]">
                        {theme.description}
                    </p>
                    <span className="bg-paper-2 text-ink-2 mt-4 inline-block rounded-md px-2.5 py-1 font-mono text-[12px]">
                        {query.themeId === ALL_THEME_ID
                            ? '/bookshelf?theme=all'
                            : `/bookshelf?theme=${theme.id}`}
                    </span>
                </div>
                {/* TODO: 테마 대표 이미지 */}
                <div className="border-line text-ink-2 grid aspect-[360/200] place-items-center rounded-2xl border bg-stripes text-[13px]">
                    테마 대표 이미지 ({theme.short_name})
                </div>
            </section>

            <div>
                <BookshelfToolbar query={query} totalCount={displayCount} />

                {items.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8">
                        {items.map((product) => (
                            <li key={product.id}>
                                <ProductCard
                                    product={product}
                                    themeLabel={
                                        shortNames.get(product.theme_id) ?? ''
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-ink-2 py-20 text-center text-sm">
                        조건에 맞는 책이 없어요.
                    </p>
                )}

                <BookshelfPagination query={query} totalPages={totalPages} />
            </div>
        </>
    );
}

// 불러오는 동안 보여줄 자리 (탭 · 소개 · 카드)
function BookshelfSkeleton() {
    return (
        <div aria-hidden="true" className="animate-pulse">
            <div className="border-line flex gap-2.5 border-b pt-8 pb-7">
                {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="bg-paper-2 h-[46px] w-32 rounded-full" />
                ))}
            </div>
            <div className="bg-paper-2 my-10 h-[200px] rounded-2xl" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8">
                {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="bg-paper-2 aspect-[336/350] rounded-2xl" />
                ))}
            </div>
        </div>
    );
}
