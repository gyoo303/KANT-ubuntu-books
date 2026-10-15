import { MailOpen, Send } from 'lucide-react';
import Link from 'next/link';
import type { LetterKind, LetterStatus, RecentLetter } from '../_data';
import StatusBadge from './StatusBadge';

const KIND: Record<LetterKind, { label: string; icon: typeof Send }> = {
    sent: { label: '내가 보낸 편지', icon: Send },
    reply: { label: '책방지기의 답장', icon: MailOpen },
};

const STATUS_LABEL: Record<LetterStatus, string> = {
    received: '접수 완료',
    reading: '고르는 중',
    unsealed: '봉인 해제',
    shipped: '발송 완료',
};

export default function RecentLetters({
    letters,
}: {
    letters: RecentLetter[];
}) {
    return (
        <section className="mt-[54px]">
            <div className="flex items-baseline justify-between">
                <h2 className="text-[22px] leading-[30px] font-medium">
                    최근 서신
                </h2>
                <Link
                    href="/mypage/mailbox"
                    className="text-olive decoration-olive text-[13px] underline underline-offset-[3px]"
                >
                    전체 보기
                </Link>
            </div>

            <ul className="border-ink mt-[23px] border-t">
                {letters.map((letter, index) => {
                    const { label, icon: Icon } = KIND[letter.kind];
                    return (
                        <li
                            key={letter.id}
                            className="flex h-[63px] items-center border-b border-[#e4d9c8]"
                        >
                            <span className="w-[84px] shrink-0 pl-1 text-sm font-semibold">
                                {letter.month}
                            </span>
                            <span className="text-ink-sub flex w-[120px] shrink-0 items-center gap-1.5 text-sm">
                                <Icon
                                    className="size-3.5"
                                    strokeWidth={1.8}
                                    aria-hidden
                                />
                                {label}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-base font-medium">
                                {letter.title}
                            </span>
                            <span className="text-ink-muted w-[120px] shrink-0 text-[13px]">
                                {letter.date}
                            </span>
                            <span className="flex w-[113px] shrink-0">
                                {/* 이번 달 편지(첫 줄)만 글자 폭, 지난 서신은 고정 폭 */}
                                <StatusBadge
                                    status={letter.status}
                                    fixedWidth={index > 0}
                                >
                                    {STATUS_LABEL[letter.status]}
                                </StatusBadge>
                            </span>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
