import type { ReactNode } from 'react';

interface GuideSectionProps {
    title: string;
    children: ReactNode;
}

export default function GuideSection({ title, children }: GuideSectionProps) {
    return (
        <section className="mt-16">
            <h2 className="typo-eyebrow border-line text-olive border-b pb-3">
                {title}
            </h2>
            <div className="mt-6">{children}</div>
        </section>
    );
}
