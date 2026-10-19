'use client';

import { cn } from '@/shared/utils/cn';
import { useEffect, useRef, useState, type ReactNode } from 'react';

interface PlayOnViewProps {
    children: ReactNode;
    className?: string;
}

// 감싼 영역이 화면에 들어올 때 안쪽 모션(FADE_UP 등)을 한 번 재생하는 블록
// 스크롤해야 보이는 위치용 — 들어오기 전에는 안쪽 애니메이션을 모두 첫 프레임에 멈춰 둔다.
// 영역 전체를 한 번에 시작하므로 줄마다 준 delay(시간차)가 스크롤 속도와 상관없이 그대로 유지된다.
export default function PlayOnView({ children, className }: PlayOnViewProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <span
            ref={ref}
            className={cn(
                'block',
                // animate-in 의 animation 단축 속성보다 우선하도록 important 로 멈춘다
                !inView && 'motion-safe:**:paused!',
                className,
            )}
        >
            {children}
        </span>
    );
}
