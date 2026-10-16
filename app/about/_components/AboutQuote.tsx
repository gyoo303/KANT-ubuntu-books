import Link from 'next/link';

const PILL =
    'inline-flex h-[38px] items-center justify-center rounded-full border px-[26px] text-xs font-bold transition-colors';

export default function AboutQuote() {
    return (
        <section className="bg-paper-2 pt-24 pb-20 text-center">
            <div className="max-w-page mx-auto w-full px-6">
                <blockquote className="text-[clamp(19px,2.6vw,22px)] leading-[1.6]">
                    “빠른 배송 대신, 한 사람을 위해 고르는 시간을
                    <br className="max-sm:hidden" />
                    보내드리고 싶었어요.”
                </blockquote>
                <p className="text-muted mt-[26px] text-[10px]">
                    — 우분투북스 책방지기
                </p>
                <div className="mt-[30px] flex flex-wrap justify-center gap-2">
                    <Link
                        href="/subscription"
                        className={`${PILL} bg-olive hover:bg-olive/90 border-transparent text-white`}
                    >
                        편지로 구독 시작하기
                    </Link>
                    <Link
                        href="/bookshelf"
                        className={`${PILL} text-ink hover:border-ink-2 hover:bg-paper border-[#cfc5b3]`}
                    >
                        테마 서가 둘러보기
                    </Link>
                </div>
            </div>
        </section>
    );
}
