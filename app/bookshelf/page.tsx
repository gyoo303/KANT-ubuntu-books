import {
    getProducts,
    getShelfTheme,
    getThemes,
} from '@/domains/products/api/productApi';
import BookshelfPagination from '@/domains/products/components/BookshelfPagination';
import BookshelfShell from '@/domains/products/components/BookshelfShell';
import BookshelfToolbar from '@/domains/products/components/BookshelfToolbar';
import ProductCard from '@/domains/products/components/ProductCard';
import ThemeTabs from '@/domains/products/components/ThemeTabs';
import { parseBookshelfQuery } from '@/domains/products/utils/bookshelfQuery';
import { Suspense } from 'react';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// [SHP-01] 테마 서가 목록 (정렬 · 품절 제외 · 페이지네이션)
export default async function BookshelfPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const [themes, theme] = await Promise.all([getThemes(), getShelfTheme()]);

    return (
        <BookshelfShell>
            {/* 페이지 머리말 */}
            <section className="border-line border-b pt-14 pb-7 md:pt-[78px]">
                <p className="text-ink-2 text-[15px] font-medium tracking-[0.08em]">
                    CURATED SHELVES · /bookshelf
                </p>
                <h1 className="mt-3 text-[32px] leading-tight font-medium md:text-[40px]">
                    테마 서가
                </h1>
                <p className="text-ink-2 mt-3 text-[15px]">
                    장르 대신 마음이 머무는 곳으로 책을 나눴어요.
                </p>
                <ThemeTabs themes={themes} activeThemeId={theme.id} />
            </section>

            {/* 선택된 테마 소개 */}
            <section className="grid items-center gap-6 py-10 md:grid-cols-[1fr_360px] md:gap-16">
                <div>
                    <h2 className="text-[28px] font-medium">
                        {theme.name}
                    </h2>
                    <p className="text-ink-2 mt-4 max-w-[680px] text-[14.5px] leading-[2]">
                        {theme.description}
                    </p>
                    <span className="bg-paper-2 text-ink-2 mt-4 inline-block rounded-md px-2.5 py-1 font-mono text-[12px]">
                        /bookshelf?theme={theme.id}
                    </span>
                </div>
                {/* TODO: 테마 대표 이미지 */}
                <div className="border-line text-ink-2 grid aspect-[360/200] place-items-center rounded-2xl border bg-stripes text-[13px]">
                    테마 대표 이미지 ({theme.short_name})
                </div>
            </section>

            {/* 주소(?sort=, ?page=)에 따라 바뀌는 부분만 Suspense 안에서 읽어요 → 위쪽은 미리 만들어 둘 수 있어요 */}
            <Suspense fallback={<BookshelfListSkeleton />}>
                <BookshelfList
                    searchParams={searchParams}
                    themeLabel={theme.short_name}
                />
            </Suspense>
        </BookshelfShell>
    );
}

const DISPLAY_COUNT = 24; // 화면에 보여줄 책 수 (디자인 시안 기준 고정 값)

// 정렬 · 품절 제외 · 페이지에 따라 바뀌는 책 목록
async function BookshelfList({
    searchParams,
    themeLabel,
}: {
    searchParams: SearchParams;
    themeLabel: string;
}) {
    const query = parseBookshelfQuery(await searchParams);
    const { items, totalPages } = await getProducts(query);

    return (
        <div>
            <BookshelfToolbar query={query} totalCount={DISPLAY_COUNT} />

            {items.length > 0 ? (
                <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8">
                    {items.map((product) => (
                        <li key={product.id}>
                            <ProductCard
                                product={product}
                                themeLabel={themeLabel}
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
    );
}

// 목록을 불러오는 동안 보여줄 자리
function BookshelfListSkeleton() {
    return (
        <div aria-hidden="true" className="animate-pulse">
            <div className="bg-paper-2 mb-6 h-6 w-40 rounded" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8">
                {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="bg-paper-2 aspect-[336/350] rounded-2xl" />
                ))}
            </div>
        </div>
    );
}
