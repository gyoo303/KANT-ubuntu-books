'use client';

import { cn } from '@/shared/utils/cn';
import {
    Flame,
    Gift,
    LibraryBig,
    MailOpen,
    ReceiptText,
    Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 마이페이지 사이드바 메뉴 (README 주소 기준)
// 이달의 언박싱·나의 서가 외의 화면은 다른 담당 작업이라 아직 없어요.
export const MYPAGE_MENU = [
    { href: '/mypage', label: '창가의 촛불', icon: Flame }, // README: [INT-01] 마이페이지 첫 화면
    { href: '/mypage/mailbox', label: '내 서신함', icon: MailOpen },
    { href: '/mypage/unboxing', label: '이달의 언박싱', icon: Gift },
    { href: '/mypage/archive', label: '나의 서가', icon: LibraryBig },
    { href: '/mypage/orders', label: '주문/배송 내역', icon: ReceiptText },
    { href: '/mypage/cancel', label: '구독 관리', icon: Settings },
] as const;

export function MypageNavLinks({ pathname }: { pathname: string | null }) {
    return (
        <nav aria-label="마이페이지 메뉴" className="flex flex-col">
            {MYPAGE_MENU.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                            'flex h-[46px] items-center gap-3 rounded-[10px] px-[22px] text-[15px] transition-colors',
                            active
                                ? 'bg-ub-card text-ub-ink font-bold'
                                : 'text-ub-sub hover:bg-ub-card/60',
                        )}
                    >
                        <Icon className="size-[18px]" strokeWidth={1.6} />
                        {label}
                    </Link>
                );
            })}
        </nav>
    );
}

export default function MypageNav() {
    return <MypageNavLinks pathname={usePathname()} />;
}
