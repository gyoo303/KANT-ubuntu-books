import type { Metadata } from 'next';
import { Suspense } from 'react';
import CandleWidget from './_components/CandleWidget';
import MonthlyBook from './_components/MonthlyBook';
import MypageSidebar from './_components/MypageSidebar';
import RecentLetters from './_components/RecentLetters';
import {
    CANDLE_STATUSES,
    CANDLES,
    CURRENT_LETTER,
    MONTHLY_BOOK,
    PLAN,
    READER,
    getRecentLetters,
    type CandleStatus,
} from './_data';

export const metadata: Metadata = {
    title: '창가의 촛불 · 우분투북스',
};

type SearchParams = Promise<{ status?: string | string[] }>;

// [INT-01] 창가의 촛불 — 화면 13 · 14 · 15
// API 연동 전 확인용: /mypage?status=received | reading | shipped (기본 received)
export default function MypagePage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    return (
        <div className="mx-auto flex w-full max-w-[1168px] gap-16 px-6 pt-14 pb-30">
            <MypageSidebar reader={READER} plan={PLAN} activeHref="/mypage" />

            <div className="min-w-0 flex-1">
                <h1 className="text-[33px] leading-[38px] font-normal">
                    창가의 촛불
                </h1>
                <p className="text-ink-sub mt-3.5 text-[15px] leading-[22px]">
                    {CURRENT_LETTER.month}의 편지가 어은동에 머무는 동안, 창가의
                    불빛으로 소식을 전해드려요.
                </p>

                {/* cacheComponents: searchParams 는 Suspense 안에서 읽어야 함 */}
                <Suspense>
                    <CandleSections searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    );
}

async function CandleSections({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const { status: param } = await searchParams;
    const status: CandleStatus = CANDLE_STATUSES.includes(param as CandleStatus)
        ? (param as CandleStatus)
        : 'received';

    return (
        <>
            <CandleWidget candle={CANDLES[status]} letter={CURRENT_LETTER} />
            <MonthlyBook status={status} book={MONTHLY_BOOK[status]} />
            <RecentLetters letters={getRecentLetters(status)} />
        </>
    );
}
