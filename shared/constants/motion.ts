import type { CSSProperties } from 'react';

// 공통 모션 (어디에든 붙여 쓰는 등장·움직임 효과)
//
// 규칙
// 1. 스타일 가이드(/styleguide)가 최우선 — 모션은 움직임만 담당하고
//    색·서체·글자 크기·간격 등 가이드가 정한 값은 바꾸지 않는다.
// 2. 모션 하나 = "동작 클래스 상수" + "수치 스타일 함수" 한 쌍
//    - 상수(FADE_UP 등): 어떤 움직임인지만 담는다. className 에 붙여 쓴다.
//    - 함수(fadeUpStyle 등): 시간·지연·거리 같은 수치를 쓰는 곳에서 정해 style 로 넘긴다.
//      수치에는 공통 기본값을 두지 않아, 같은 모션도 곳마다 다른 값을 줄 수 있다.
// 3. 수치는 CSS 변수로 넘기므로 Tailwind 클래스를 새로 만들 필요 없이 어떤 값이든 쓸 수 있다.
// 4. 모든 동작 클래스는 motion-safe: 로 감싼다 — '동작 줄이기' 설정 사용자에게는 효과 없이 바로 보인다.

// 모든 모션이 공통으로 받는 시간 값 (단위 ms)
export interface MotionTiming {
    duration: number;
    // 시작 전 대기 시간 — 여러 요소에 시간차를 줄 때 쓴다
    delay?: number;
}

// tw-animate-css 의 animate-in 이 읽는 CSS 변수
const timingVars = ({ duration, delay = 0 }: MotionTiming) => ({
    '--tw-animation-duration': `${duration}ms`,
    '--tw-animation-delay': `${delay}ms`,
});

// ── FADE_UP: 아래에서 올라오며 서서히 나타남 ──
// 요소가 처음 그려질 때(페이지 진입·새로고침) 1회 동작한다.
// 스크롤해야 보이는 위치라면 FadeUpOnView(한 덩어리) 또는 PlayOnView(여러 줄 시간차)로 감싼다.
// fill-mode-both 로 delay 중인 요소가 시작 전에 미리 보이지 않게 한다.
// inline 요소(span 등)는 transform 이 적용되지 않으므로 block / inline-block 과 함께 쓴다.
//
// 예) <p className={`block ${FADE_UP}`} style={fadeUpStyle({ duration: 1500, distance: 24 })}>
export const FADE_UP =
    'motion-safe:animate-in motion-safe:fade-in motion-safe:ease-out motion-safe:fill-mode-both';

export interface FadeUpValues extends MotionTiming {
    // 올라오는 거리 (px)
    distance: number;
}

export function fadeUpStyle({
    distance,
    ...timing
}: FadeUpValues): CSSProperties {
    return {
        ...timingVars(timing),
        '--tw-enter-translate-y': `${distance}px`,
    } as CSSProperties;
}

// ── TYPE_IN: 한 글자씩 타이핑되듯 나타남 (글자를 따라 커서가 움직임) ──
// 글자 하나하나에 붙이는 클래스 — 보통은 TypingText 컴포넌트가 문장을 글자로 나눠 붙여 준다.
// 키프레임은 app/globals.css 의 motion-type-in 에 있다.
//
// 예) <TypingText interval={70}>문장</TypingText>
export const TYPE_IN = 'motion-safe:motion-type-in';

export interface TypeInValues {
    // 글자 사이 간격 (ms) — 작을수록 빠르게 쳐진다
    interval: number;
    // 첫 글자가 나오기 전 대기 시간 (ms)
    delay?: number;
}

// index 번째 글자(0부터)의 수치
export function typeInStyle(
    { interval, delay = 0 }: TypeInValues,
    index: number,
): CSSProperties {
    return {
        '--motion-interval': `${interval}ms`,
        '--motion-delay': `${delay + index * interval}ms`,
    } as CSSProperties;
}
