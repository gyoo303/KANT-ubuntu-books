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

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// [SHP-01] 테마 서가 목록 (정렬 · 품절 제외 · 페이지네이션)
export default async function BookshelfPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const [themes, theme] = await Promise.all([getThemes(), getShelfTheme()]);
    const query = parseBookshelfQuery(await searchParams);
    const { items, totalPages } = await getProducts(query);
    const DISPLAY_COUNT = 24; // 화면에 보여줄 책 수 (디자인 시안 기준 고정 값)

    return (
        <BookshelfShell>
            <header className="pt-10">
                <h1 className="font-ub-serif text-[26px] font-medium md:text-[32px]">
                    {theme.name}
                </h1>
                <p className="text-ub-sub mt-2 text-[13px]">
                    {theme.description}
                </p>
            </header>

            <ThemeTabs themes={themes} activeThemeId={theme.id} />

            <div className="mt-8">
                <BookshelfToolbar query={query} totalCount={DISPLAY_COUNT} />

                {items.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
                        {items.map((product) => (
                            <li key={product.id}>
                                <ProductCard
                                    product={product}
                                    themeLabel={theme.short_name}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-ub-sub py-20 text-center text-sm">
                        조건에 맞는 책이 없어요.
                    </p>
                )}

                <div className="mt-12">
                    <BookshelfPagination
                        query={query}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </BookshelfShell>
    );
}
