'use client';

import { useLayoutEffect, useRef } from 'react';

// 15: 발송 완료 — 우체통 점등 레이어
// 발송 후 첫 방문에만 점등 애니메이션을 1회 재생하고, 이후 방문에는 켜진 상태로 보여줍니다.
const STORAGE_PREFIX = 'ubuntu-books:mailbox-lit:';

const LIGHT_ON: Keyframe[] = [
    { opacity: 0 },
    { opacity: 0, offset: 0.15 },
    { opacity: 0.7, offset: 0.35 },
    { opacity: 0.35, offset: 0.45 },
    { opacity: 1, offset: 0.7 },
    { opacity: 1 },
];

function hasSeen(key: string) {
    try {
        return localStorage.getItem(key) === '1';
    } catch {
        return true; // 저장소를 쓸 수 없으면 애니메이션 없이 표시
    }
}

function markSeen(key: string) {
    try {
        localStorage.setItem(key, '1');
    } catch {
        // 저장 실패 시 다음 방문에 한 번 더 재생될 수 있음
    }
}

export default function MailboxLamp({ shipmentId }: { shipmentId: string }) {
    const ref = useRef<SVGGElement>(null);

    useLayoutEffect(() => {
        const key = STORAGE_PREFIX + shipmentId;
        if (hasSeen(key)) return;
        markSeen(key);

        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        if (reduceMotion || !ref.current?.animate) return;

        ref.current.animate(LIGHT_ON, {
            duration: 1800,
            delay: 300,
            easing: 'ease-out',
            fill: 'backwards',
        });
    }, [shipmentId]);

    return (
        <g ref={ref}>
            <defs>
                <radialGradient
                    id="candle-mailbox-glow"
                    gradientUnits="userSpaceOnUse"
                    cx="363.5"
                    cy="309"
                    r="58"
                >
                    <stop offset="0" stopColor="#ff966e" stopOpacity="0.5" />
                    <stop offset="0.36" stopColor="#ff966e" stopOpacity="0.4" />
                    <stop
                        offset="0.59"
                        stopColor="#ff966e"
                        stopOpacity="0.26"
                    />
                    <stop
                        offset="0.69"
                        stopColor="#ff966e"
                        stopOpacity="0.18"
                    />
                    <stop
                        offset="0.83"
                        stopColor="#ff966e"
                        stopOpacity="0.08"
                    />
                    <stop offset="1" stopColor="#ff966e" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* 불빛 */}
            <circle
                cx="363.5"
                cy="309"
                r="58"
                fill="url(#candle-mailbox-glow)"
            />
            <rect x="360" y="328" width="7" height="118.5" fill="#5a3d2b" />

            {/* 깃발 (올라간 상태) */}
            <rect x="387.5" y="283" width="3.5" height="31" fill="#6b4a35" />
            <rect x="391" y="283" width="12" height="8" fill="#f2c14e" />

            {/* 켜진 우체통 + 꽂힌 편지 */}
            <path d="M340 303a23.5 16 0 0 1 47 0v25h-47Z" fill="#d2593a" />
            <rect x="340" y="323" width="47" height="5" fill="#ac452b" />
            <rect
                x="356.25"
                y="299.5"
                width="14.5"
                height="10"
                fill="#fff8ee"
                transform="rotate(-9 363.5 304.5)"
            />
            <rect
                x="353"
                y="308.5"
                width="21"
                height="2.5"
                rx="1.25"
                fill="#3a2a22"
            />
        </g>
    );
}
