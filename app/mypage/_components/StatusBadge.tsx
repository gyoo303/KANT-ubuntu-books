import { cn } from '@/shared/utils/cn';
import type { LetterStatus } from '../_data';

// 상태별 색상 (시안 기준)
const STATUS_STYLE: Record<LetterStatus, string> = {
    received: 'bg-[#ece6dd] text-[#6b6159]',
    reading: 'bg-[#fbebc8] text-[#93630e]',
    unsealed: 'bg-[#e3e8de] text-[#4c5c47]',
    shipped: 'bg-[#f5ded6] text-[#9c3f27]',
};

interface StatusBadgeProps {
    status: LetterStatus;
    // 시안에서 지난 서신 배지는 고정 너비(110px)로 표시됨
    fixedWidth?: boolean;
    children: React.ReactNode;
}

export default function StatusBadge({
    status,
    fixedWidth = false,
    children,
}: StatusBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex h-6 items-center gap-1.5 rounded-full pr-3 pl-[11px] text-xs font-medium whitespace-nowrap',
                STATUS_STYLE[status],
                fixedWidth && 'w-[110px]',
            )}
        >
            <span className="size-1.5 rounded-full bg-current" aria-hidden />
            {children}
        </span>
    );
}
