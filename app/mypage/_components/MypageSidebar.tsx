import { cn } from '@/shared/utils/cn';
import {
    Flame,
    Gift,
    LibraryBig,
    MailOpen,
    ReceiptText,
    Settings,
    type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import type { Plan, Reader } from '../_data';

interface MenuItem {
    href: string;
    label: string;
    icon: LucideIcon;
}

// 경로는 README 의 mypage 구조 기준. 구독 관리(22)는 README 에 경로가 없어 임시 지정
const MENU: MenuItem[] = [
    { href: '/mypage', label: '창가의 촛불', icon: Flame },
    { href: '/mypage/mailbox', label: '내 서신함', icon: MailOpen },
    { href: '/mypage/unboxing', label: '이달의 언박싱', icon: Gift },
    { href: '/mypage/archive', label: '나의 서가', icon: LibraryBig },
    { href: '/mypage/orders', label: '주문/배송 내역', icon: ReceiptText },
    { href: '/mypage/subscription', label: '구독 관리', icon: Settings },
];

interface MypageSidebarProps {
    reader: Reader;
    plan: Plan;
    activeHref: string;
}

export default function MypageSidebar({
    reader,
    plan,
    activeHref,
}: MypageSidebarProps) {
    return (
        <aside className="w-[232px] shrink-0">
            {/* 독자 프로필 */}
            <div className="flex size-[52px] items-center justify-center rounded-full bg-[#e9ead6] text-base font-medium text-[#4d5029]">
                {reader.initial}
            </div>
            <p className="mt-[15px] text-[22px] leading-[30px] font-medium">
                {reader.name} 독자님
            </p>
            <p className="text-ink-muted mt-2 text-[13px] leading-[19px]">
                우분투북스와 {reader.season}번째 계절
            </p>

            {/* 마이페이지 메뉴 */}
            <nav
                aria-label="마이페이지 메뉴"
                className="mt-[26px] border-t border-[#e4d9c8] pt-4"
            >
                <ul>
                    {MENU.map(({ href, label, icon: Icon }) => {
                        const active = href === activeHref;
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    aria-current={active ? 'page' : undefined}
                                    className={cn(
                                        'flex h-[46px] items-center gap-3 rounded-lg pl-3.5 text-[15px] transition-colors',
                                        active
                                            ? 'text-ink bg-[#efe6d6] font-semibold'
                                            : 'text-ink-sub hover:text-ink',
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            'size-5',
                                            active
                                                ? 'text-olive'
                                                : 'text-ink-muted',
                                        )}
                                        strokeWidth={1.6}
                                        aria-hidden
                                    />
                                    {label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* 구독 중인 플랜 */}
            <div className="mt-6 rounded-lg border border-[#e4d9c8] px-[18px] pt-[19px] pb-5">
                <p className="text-ink-sub text-[13px] leading-[19px]">
                    구독 중인 플랜
                </p>
                <p className="mt-2 text-base leading-6 font-semibold">
                    {plan.name}
                </p>
                <p className="text-ink-sub mt-1 text-[13px] leading-[19px]">
                    다음 결제 {plan.nextBilling}
                </p>
            </div>
        </aside>
    );
}
