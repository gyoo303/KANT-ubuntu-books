import PlayOnView from '@/shared/components/PlayOnView';
import {
    FADE_UP,
    fadeUpStyle,
    type FadeUpValues,
} from '@/shared/constants/motion';
import { cn } from '@/shared/utils/cn';
import type { ReactNode } from 'react';

interface FadeUpOnViewProps extends FadeUpValues {
    children: ReactNode;
    className?: string;
}

// 화면에 들어올 때 한 번 FADE_UP 효과로 떠오르는 블록 (한 덩어리 문구용 단축 컴포넌트)
// 여러 줄에 시간차를 줄 때는 PlayOnView 안에 FADE_UP 요소를 여러 개 넣는다.
// 수치(duration·delay·distance)는 쓰는 곳에서 정한다.
export default function FadeUpOnView({
    children,
    className,
    ...values
}: FadeUpOnViewProps) {
    return (
        <PlayOnView>
            <span
                className={cn('block', FADE_UP, className)}
                style={fadeUpStyle(values)}
            >
                {children}
            </span>
        </PlayOnView>
    );
}
