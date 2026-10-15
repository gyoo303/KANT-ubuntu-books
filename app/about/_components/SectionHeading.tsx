import type { ReactNode } from 'react';

interface SectionHeadingProps {
    eyebrow: string;
    children: ReactNode;
}

export default function SectionHeading({
    eyebrow,
    children,
}: SectionHeadingProps) {
    return (
        <>
            <p className="text-xs font-medium tracking-[0.14em] uppercase">
                {eyebrow}
            </p>
            <h2 className="mt-3.5 text-[26px] leading-[1.45] font-normal tracking-[-0.01em]">
                {children}
            </h2>
        </>
    );
}
