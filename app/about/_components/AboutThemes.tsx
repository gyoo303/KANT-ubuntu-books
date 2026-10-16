import { THEMES } from '../_data';
import SectionHeading from './SectionHeading';

export default function AboutThemes() {
    return (
        <section className="pt-10 pb-28">
            <div className="max-w-page mx-auto w-full px-6">
                <SectionHeading eyebrow="FOUR THEMES">
                    우분투북스가 붙드는 네 가지 이야기
                </SectionHeading>

                <ul className="border-ink-2 mt-9 grid grid-cols-1 gap-x-6 gap-y-10 border-t pt-[30px] sm:grid-cols-2 md:grid-cols-4 md:gap-y-6">
                    {THEMES.map(({ no, tag, icon: Icon, title, desc }) => (
                        <li key={no}>
                            <p className="text-ink-2 text-[11px]">
                                {no} · {tag}
                            </p>
                            <span className="bg-olive-soft text-olive mt-4 inline-flex size-[34px] items-center justify-center rounded-full">
                                <Icon
                                    className="size-[18px]"
                                    strokeWidth={1.6}
                                    aria-hidden
                                />
                            </span>
                            <h3 className="mt-4 text-base font-medium">
                                {title}
                            </h3>
                            <p className="text-ink-2 mt-2 text-[11px] leading-[1.85]">
                                {desc}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
