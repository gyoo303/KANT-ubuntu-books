'use client';

import { NAV_ITEMS } from '@/shared/constants/navigation';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const DRAWER_LINK =
    'border-b border-line py-3 text-[15px] transition-colors hover:text-olive';

// 햄버거 버튼 + 펼침 메뉴 (모바일에서는 주 메뉴, 데스크톱에서는 보조 메뉴 역할)
export default function HeaderMenu() {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    const Icon = open ? X : Menu;

    return (
        <>
            <button
                type="button"
                aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
                aria-expanded={open}
                aria-controls="header-menu"
                onClick={() => setOpen((v) => !v)}
                className="text-ink-2 hover:text-ink inline-flex p-1 transition-colors"
            >
                <Icon className="size-[18px]" strokeWidth={1.6} />
            </button>

            {open && (
                <div
                    id="header-menu"
                    className="border-line bg-paper absolute inset-x-0 top-full border-y pt-3 pb-5"
                >
                    <div className="max-w-page mx-auto flex w-full flex-col px-6">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={close}
                                className={DRAWER_LINK}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/auth/signin"
                            onClick={close}
                            className={DRAWER_LINK}
                        >
                            로그인
                        </Link>
                        <Link
                            href="/subscription"
                            onClick={close}
                            className="bg-olive hover:bg-olive/90 mt-4 inline-flex h-11 items-center justify-center rounded-full px-6.5 text-sm font-bold text-white transition-colors"
                        >
                            편지로 구독하기
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
