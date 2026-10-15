import {
    getProduct,
    getProductIds,
    getRelatedProducts,
    getTheme,
} from '@/domains/products/api/productApi';
import BookshelfShell from '@/domains/products/components/BookshelfShell';
import BookCover from '@/domains/products/components/BookCover';
import ProductGallery from '@/domains/products/components/ProductGallery';
import ProductPurchasePanel from '@/domains/products/components/ProductPurchasePanel';
import ThemeIcon from '@/domains/products/components/ThemeIcon';
import { buildBookshelfHref } from '@/domains/products/utils/bookshelfQuery';
import { formatPrice } from '@/shared/utils/formatPrice';
import { Leaf } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Params = Promise<{ id: string }>;

// 알고 있는 도서는 빌드 때 미리 만들어 두고, 나머지는 요청 시 렌더링해요.
export async function generateStaticParams() {
    const ids = await getProductIds();
    return ids.map((id) => ({ id }));
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);
    return {
        title: product
            ? `${product.title} | 우분투북스`
            : '찾을 수 없는 책 | 우분투북스',
    };
}

// [SHP-02] 도서 상세
export default function ProductDetailPage({ params }: { params: Params }) {
    return (
        <BookshelfShell>
            <Suspense fallback={<ProductDetailSkeleton />}>
                <ProductDetail params={params} />
            </Suspense>
        </BookshelfShell>
    );
}

async function ProductDetail({ params }: { params: Params }) {
    const { id } = await params;
    const product = await getProduct(id);
    if (!product) notFound(); // → app/[id]/not-found.tsx (없는 상품 안내)

    const [theme, related] = await Promise.all([
        getTheme(product.theme_id),
        getRelatedProducts(product),
    ]);
    const publishedAt = product.published_at.replaceAll('-', '.');

    return (
        <>
            <nav
                aria-label="현재 위치"
                className="text-ub-sub pt-7 pb-5 text-[11px]"
            >
                <Link href="/" className="hover:text-ub-ink hover:underline">
                    테마 서가
                </Link>
                {theme && (
                    <>
                        {' / '}
                        <Link
                            href={buildBookshelfHref({ themeId: theme.id })}
                            className="hover:text-ub-ink hover:underline"
                        >
                            {theme.name}
                        </Link>
                    </>
                )}
                {' / '}
                <span aria-current="page">{product.title}</span>
            </nav>

            <section className="grid gap-7 md:grid-cols-2 md:gap-14">
                <ProductGallery product={product} />

                <div>
                    {theme && (
                        <Link
                            href={buildBookshelfHref({ themeId: theme.id })}
                            className="bg-ub-olive-soft text-ub-olive inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px]"
                        >
                            <ThemeIcon name={theme.icon} className="h-3 w-3" />
                            {theme.name}
                        </Link>
                    )}
                    <h1 className="font-ub-serif mt-2.5 mb-1 text-[26px] font-medium md:text-[34px]">
                        {product.title}
                    </h1>
                    <p className="text-ub-muted text-xs">
                        {product.author} 지음 · {product.publisher} ·{' '}
                        {publishedAt.slice(0, 4)} · {product.page_count}쪽
                    </p>

                    {/* 책방지기 노트 */}
                    <div className="border-ub-line bg-ub-cream my-6 rounded-xl border px-6 py-6 md:px-[30px]">
                        <p className="font-ub-serif text-ub-olive flex items-center gap-2 text-[11px]">
                            <span className="bg-ub-olive-soft grid h-6 w-6 place-items-center rounded-full font-semibold">
                                책
                            </span>
                            책방지기 노트 · Curator&apos;s Voice
                        </p>
                        <p className="font-ub-serif mt-3.5 text-[15px] leading-[1.95] md:text-base">
                            {product.curator_note}
                        </p>
                        {product.pairing_note && (
                            <p className="border-ub-border text-ub-sub mt-4 flex gap-2 border-t border-dashed pt-4 text-xs">
                                <Leaf
                                    className="mt-0.5 h-3 w-3 shrink-0"
                                    aria-hidden="true"
                                />
                                <span>
                                    <strong className="text-ub-ink">
                                        페어링
                                    </strong>{' '}
                                    · {product.pairing_note}
                                </span>
                            </p>
                        )}
                    </div>

                    <ProductPurchasePanel product={product} />
                </div>
            </section>

            <DetailSection
                title="출판사 책 소개"
                className="mt-16 md:mt-[70px]"
            >
                <p className="text-ub-sub max-w-[660px] text-[13px] leading-loose">
                    {product.publisher_intro}
                </p>
            </DetailSection>

            <DetailSection title="책 정보">
                <dl className="grid grid-cols-[105px_1fr] gap-y-3 text-[12.5px]">
                    <dt className="text-ub-muted">저자</dt>
                    <dd>{product.author}</dd>
                    <dt className="text-ub-muted">출판사</dt>
                    <dd>{product.publisher}</dd>
                    <dt className="text-ub-muted">출간일</dt>
                    <dd>{publishedAt}</dd>
                    <dt className="text-ub-muted">쪽수 · 판형</dt>
                    <dd>
                        {product.page_count}쪽 · {product.size}
                    </dd>
                    <dt className="text-ub-muted">ISBN</dt>
                    <dd>{product.isbn}</dd>
                </dl>
            </DetailSection>

            {related.length > 0 && (
                <DetailSection title="같은 서가의 책">
                    <ul className="grid grid-cols-2 gap-5 md:grid-cols-4">
                        {related.map((r) => (
                            <li key={r.id}>
                                <Link href={`/${r.id}`} className="group block">
                                    <div className="bg-ub-card group-hover:bg-ub-card-hover grid place-items-center rounded-lg py-4 transition-colors">
                                        <BookCover
                                            product={r}
                                            size="sm"
                                            className="w-[69%]"
                                        />
                                    </div>
                                    <p className="mt-3 text-[13px]">
                                        {r.title}
                                    </p>
                                    <p className="text-ub-muted text-[11px]">
                                        {formatPrice(r.price)}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </DetailSection>
            )}
        </>
    );
}

function DetailSection({
    title,
    className = '',
    children,
}: {
    title: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <section
            className={`border-ub-line grid gap-5 border-t py-10 md:grid-cols-[250px_1fr] md:gap-0 md:py-14 ${className}`}
        >
            <h2 className="font-ub-serif text-[19px] font-medium">{title}</h2>
            <div>{children}</div>
        </section>
    );
}

function ProductDetailSkeleton() {
    return (
        <div aria-hidden="true" className="animate-pulse pt-16">
            <div className="grid gap-7 md:grid-cols-2 md:gap-14">
                <div className="bg-ub-card aspect-[454/530] rounded-xl" />
                <div className="space-y-4">
                    <div className="bg-ub-card h-5 w-28 rounded-full" />
                    <div className="bg-ub-card h-10 w-2/3 rounded" />
                    <div className="bg-ub-card h-56 rounded-xl" />
                    <div className="bg-ub-card h-32 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
