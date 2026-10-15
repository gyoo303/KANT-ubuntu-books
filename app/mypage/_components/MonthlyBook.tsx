import { Flame, LockOpen, Mail } from 'lucide-react';
import Link from 'next/link';
import type { CandleStatus, MonthlyBook as MonthlyBookData } from '../_data';

interface MonthlyBookProps {
    status: CandleStatus;
    book: MonthlyBookData;
}

export default function MonthlyBook({ status, book }: MonthlyBookProps) {
    return (
        <section className="mt-[54px]">
            <div className="flex items-baseline justify-between">
                <h2 className="text-[22px] leading-[30px] font-medium">
                    이달의 책
                </h2>
                <p className="text-ink-muted text-[13px]">{book.issue}</p>
            </div>

            {status === 'shipped' ? (
                <SealedBook hint={book.hint} />
            ) : (
                <WaitingBook status={status} book={book} />
            )}
        </section>
    );
}

// 13·14: 책이 서점 문을 나서기 전 (빈 상태)
function WaitingBook({ status, book }: MonthlyBookProps) {
    const Icon = status === 'reading' ? Flame : Mail;
    return (
        <div className="mt-[22px] rounded-[16px] border border-dashed border-[#cfc1aa] pt-[50px] pb-[50px] text-center">
            <Icon
                className="text-ink-muted mx-auto size-[30px]"
                strokeWidth={1.6}
                aria-hidden
            />
            <p className="mt-[15px] text-[19px] leading-[27px] font-medium">
                {book.title}
            </p>
            <p className="text-ink-sub mt-2 text-[13px] leading-[19px]">
                {book.desc}
            </p>
        </div>
    );
}

// 15: 발송 완료 — 봉인된 책과 책방지기의 힌트
function SealedBook({ hint }: { hint: string[] }) {
    return (
        <div className="mt-[22px] flex items-center gap-10 rounded-[16px] border border-[#e4d9c8] bg-[#fffcf7] p-9">
            <div className="flex h-[270px] w-[180px] shrink-0 flex-col items-center justify-center rounded-r-[6px] bg-[#4e6254] shadow-[inset_0_0_12px_rgba(255,255,255,0.12)]">
                <span className="flex size-14 items-center justify-center rounded-full border-4 border-[#cd745e] bg-[#c2553a] text-xl text-[#fbe3d8] shadow-[0_3px_8px_rgba(0,0,0,0.25)]">
                    우
                </span>
                <span className="mt-3 text-[13px] leading-[19px] font-semibold text-[#f9f1ea]">
                    봉인된 책
                </span>
            </div>

            <div className="pt-[3px]">
                <p className="text-olive text-[13px] leading-[19px] font-semibold tracking-[0.1em]">
                    책방지기가 남긴 힌트
                </p>
                <p className="mt-[15px] text-[22px] leading-[37px] font-medium">
                    “{hint[0]}
                    <br />
                    {hint[1]}”
                </p>
                <div className="mt-[22px] flex items-center gap-3">
                    <Link
                        href="/mypage/unboxing"
                        className="bg-ink inline-flex h-12 items-center gap-2 rounded-full pr-7 pl-[26px] text-[15px] font-bold text-[#f7f2e9] transition-colors hover:bg-black"
                    >
                        <LockOpen
                            className="size-[18px]"
                            strokeWidth={2}
                            aria-hidden
                        />
                        봉인 풀기
                    </Link>
                    <p className="text-ink-muted text-[13px]">
                        상자 속 카드의 6자리 코드가 필요해요
                    </p>
                </div>
            </div>
        </div>
    );
}
