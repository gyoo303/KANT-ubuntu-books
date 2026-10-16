import BookshelfShell from '@/domains/products/components/BookshelfShell';
import Link from 'next/link';

// 없는 상품 안내 — /bookshelf/[id] 에서 notFound() 가 호출되면 표시돼요.
export default function ProductNotFound() {
    return (
        <BookshelfShell>
            <section className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
                <p className="text-muted-foreground text-xs tracking-[0.14em]">
                    NOT FOUND
                </p>
                <h1 className="mt-3 mb-2.5 text-2xl font-medium md:text-[28px]">
                    찾으시는 책이 서가에 없어요
                </h1>
                <p className="text-ink-2 text-[13px] leading-relaxed">
                    주소가 잘못되었거나, 판매가 끝난 책일 수 있어요.
                    <br />
                    테마 서가에서 다른 책을 둘러보시겠어요?
                </p>
                <div className="mt-7 flex gap-2.5">
                    <Link
                        href="/bookshelf"
                        className="bg-olive hover:bg-olive/90 rounded-full px-5 py-3 text-[13px] font-bold text-white transition-colors"
                    >
                        테마 서가로 가기
                    </Link>
                </div>
            </section>
        </BookshelfShell>
    );
}
