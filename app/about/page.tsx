import type { Metadata } from 'next';
import AboutGallery from './_components/AboutGallery';
import AboutHero from './_components/AboutHero';
import AboutQuote from './_components/AboutQuote';
import AboutSpace from './_components/AboutSpace';
import AboutThemes from './_components/AboutThemes';

export const metadata: Metadata = {
    title: '브랜드 스토리 · 우분투북스',
    description:
        '네가 있어 내가 있다. 대전 어은동 골목 끝 작은 책방, 우분투북스의 이야기.',
};

// [BRD-01] 브랜드 스토리 (우분투 철학 및 어은동 공간)
export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <AboutGallery />
            <AboutSpace />
            <AboutThemes />
            <AboutQuote />
        </>
    );
}
