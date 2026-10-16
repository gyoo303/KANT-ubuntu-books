import type { Metadata } from 'next';
import BreakpointGuide from './_components/BreakpointGuide';
import ColorPalette from './_components/ColorPalette';
import ComponentShowcase from './_components/ComponentShowcase';
import GuideSection from './_components/GuideSection';
import TypeScale from './_components/TypeScale';

export const metadata: Metadata = {
    title: '스타일 가이드 · 우분투북스',
    robots: { index: false, follow: false },
};

// [00] 스타일 가이드 — 개발용 문서 페이지 (메뉴에 노출하지 않음)
// TODO(responsive): 현재 데스크톱 기준 레이아웃. 모바일·태블릿 작업 시 그리드 열 수를 줄인다.
export default function StyleGuidePage() {
    return (
        <div className="max-w-page mx-auto w-full px-6 pt-14 pb-24">
            <p className="typo-eyebrow text-olive">
                Ubuntu Books · Design System v0.1
            </p>
            <h1 className="typo-h1 mt-2">스타일 가이드</h1>
            <p className="typo-caption text-ink-2 mt-3">
                종이, 나무, 촛불의 색. 본문은 명조, 인터페이스는 고딕, 손편지는
                손글씨체를 써요.
            </p>

            <GuideSection title="Color">
                <ColorPalette />
            </GuideSection>
            <GuideSection title="Typography">
                <TypeScale />
            </GuideSection>
            <GuideSection title="Components">
                <ComponentShowcase />
            </GuideSection>
            <GuideSection title="Breakpoints · Responsive">
                <BreakpointGuide />
            </GuideSection>
        </div>
    );
}
