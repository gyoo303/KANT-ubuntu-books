import HeaderAuthLinks from '@/shared/components/HeaderAuthLinks';
import HeaderMenu from '@/shared/components/HeaderMenu';
import HeaderNav, { NavLinks } from '@/shared/components/HeaderNav';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

// TODO: 장바구니 스토어(Zustand) 연동 전 임시 값
const CART_COUNT = 2;

export default function Header() {
    return (
        <header className="border-line bg-paper/95 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
            <div className="max-w-page mx-auto flex h-16 w-full items-center gap-12 px-6">
                {/* 로고 영역 */}
                <Link
                    href="/about"
                    className="flex shrink-0 items-baseline gap-2"
                >
                    <span className="text-[17px] font-medium">우분투북스</span>
                    <span className="text-muted-foreground text-[9px] tracking-[0.16em]">
                        UBUNTU BOOKS
                    </span>
                </Link>

                {/* 네비게이션 영역 (lg 이상) */}
                <Suspense fallback={<NavLinks pathname={null} />}>
                    <HeaderNav />
                </Suspense>

                {/* 우측 액션 영역 */}
                <div className="ml-auto flex items-center gap-4">
                    <Link
                        href="/cart"
                        aria-label={`장바구니 ${CART_COUNT}개`}
                        className="relative inline-flex p-1"
                    >
                        <ShoppingBag
                            className="size-[18px]"
                            strokeWidth={1.6}
                        />
                        {CART_COUNT > 0 && (
                            <span className="bg-olive absolute -top-[3px] -right-[5px] h-3.5 min-w-3.5 rounded-full px-[3px] text-center text-[9px] leading-3.5 font-bold text-white">
                                {CART_COUNT}
                            </span>
                        )}
                    </Link>
                    <HeaderAuthLinks variant="bar" />
                    <Link
                        href="/subscription"
                        className="bg-ink hidden h-8 items-center rounded-full px-4 text-xs font-bold text-white transition-colors hover:bg-black lg:inline-flex"
                    >
                        편지로 구독하기
                    </Link>
                    <HeaderMenu />
                </div>
            </div>
        </header>
    );
}
