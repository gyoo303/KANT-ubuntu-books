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
            <p className="typo-eyebrow">{eyebrow}</p>
            <h2 className="typo-h2 mt-3.5">{children}</h2>
        </>
    );
}
