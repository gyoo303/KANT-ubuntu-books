import { getProducts, getThemes } from '@/domains/products/api/productApi';
import BookshelfPagination from '@/domains/products/components/BookshelfPagination';
import BookshelfShell from '@/domains/products/components/BookshelfShell';
import BookshelfToolbar from '@/domains/products/components/BookshelfToolbar';
import ProductCard from '@/domains/products/components/ProductCard';
import ThemeTabs from '@/domains/products/components/ThemeTabs';
import { parseBookshelfQuery } from '@/domains/products/utils/bookshelfQuery';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// [SHP-01] 테마 서가 목록 (탭 필터 · 정렬 · 품절 제외 · 페이지네이션)
export default async function BookshelfPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const themes = await getThemes();
    const query = parseBookshelfQuery(
        await searchParams,
        themes.map((t) => t.id),
    );
    const { items, totalCount, totalPages } = await getProducts(query);
    const activeTheme = themes.find((t) => t.id === query.themeId) ?? null;
    const themeLabel = (themeId: string) =>
        themes.find((t) => t.id === themeId)?.short_name ?? '';

    return (
        <BookshelfShell>
            <header className="pt-10">
                <h1 className="font-ub-serif text-[26px] font-medium md:text-[32px]">
                    {activeTheme ? activeTheme.name : '테마 서가'}
                </h1>
                {activeTheme && (
                    <p className="text-ub-sub mt-2 text-[13px]">
                        {activeTheme.description}
                    </p>
                )}
            </header>

            <ThemeTabs themes={themes} activeThemeId={query.themeId} />

            <div className="mt-8">
                <BookshelfToolbar query={query} totalCount={totalCount} />

                {items.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
                        {items.map((product) => (
                            <li key={product.id}>
                                <ProductCard
                                    product={product}
                                    themeLabel={themeLabel(product.theme_id)}
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
                    <BookshelfPagination query={query} totalPages={totalPages} />
                </div>
            </div>
        </BookshelfShell>
    );
}
