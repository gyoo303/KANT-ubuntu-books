'use client';

import { NAV_ITEMS } from '@/shared/constants/navigation';
import { cn } from '@/shared/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function isActive(pathname: string | null, href: string) {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
}

// 현재 경로를 모를 때(Suspense fallback)는 pathname=null 로 렌더링
export function NavLinks({ pathname }: { pathname: string | null }) {
    return (
        <nav aria-label="주요 메뉴" className="ml-3 hidden gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'text-ink-2 hover:text-ink text-[13px] transition-colors',
                        isActive(pathname, item.href) && 'text-ink font-bold',
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
}

// cacheComponents 환경에서 usePathname 은 Suspense 경계 안에서 사용해야 함
export default function HeaderNav() {
    const pathname = usePathname();
    return <NavLinks pathname={pathname} />;
}
