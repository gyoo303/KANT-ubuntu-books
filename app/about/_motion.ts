// 브랜드 스토리(/about) 페이지 모션 수치
// 제목 모션: 줄마다 시간차를 두고 아래에서 떠오른다 (히어로·THE SPACE 제목 공통)
import { FADE_UP, fadeUpStyle } from '@/shared/constants/motion';

export const TITLE_LINE = `block ${FADE_UP}`;

// index 번째 줄(0부터)의 수치 — 줄마다 600ms 씩 늦게 시작
export const titleLineStyle = (index: number) =>
    fadeUpStyle({ duration: 1500, distance: 24, delay: index * 600 });
