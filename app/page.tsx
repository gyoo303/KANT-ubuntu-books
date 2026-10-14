import { buttonVariants } from '@/shared/components/ui/button';
import {
    MOCK_HOME_STATS,
    MOCK_HOME_STEPS,
    MOCK_SEASONAL_BOOKS,
    MOCK_THEME_SHELVES,
} from '@/shared/mocks/home.mock';
import { cn } from '@/shared/utils/cn';
import Link from 'next/link';
import {
    FiArrowRight,
    FiBookmark,
    FiBox,
    FiEdit3,
    FiSun,
} from 'react-icons/fi';

const STEP_ICONS = [FiEdit3, FiSun, FiBox, FiBookmark];

// 01 메인(홈)
export default function Home() {
    return (
        <div>
            {/* 히어로 */}
            <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-20">
                <div>
                    <p className="text-muted-foreground text-xs">
                        대전 어은동 · 편지로 시작하는 책 정기구독
                    </p>
                    <h1 className="mt-4 text-3xl leading-tight font-bold md:text-5xl">
                        편지를 보내주세요.
                        <br />
                        책으로 답장하겠습니다.
                    </h1>
                    <p className="text-muted-foreground mt-6 text-sm leading-relaxed md:text-base">
                        알고리즘 대신 책방지기가, 내일 도착 대신 한 달의
                        기다림이 있습니다.
                        <br className="hidden md:block" />
                        당신의 편지를 천천히 읽고, 어울리는 책을 골라 상자에
                        담아 보냅니다.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/subscription"
                            className={cn(
                                buttonVariants({ size: 'lg' }),
                                'h-12 rounded-full px-6',
                            )}
                        >
                            편지로 구독 시작하기
                        </Link>
                        <Link
                            href="#slow-by-design"
                            className={cn(
                                buttonVariants({
                                    variant: 'outline',
                                    size: 'lg',
                                }),
                                'h-12 rounded-full px-6',
                            )}
                        >
                            어떻게 도착하나요?
                        </Link>
                    </div>
                    <dl className="border-border mt-10 grid grid-cols-3 gap-4 border-t pt-6">
                        {MOCK_HOME_STATS.map((stat) => (
                            <div key={stat.label}>
                                <dt className="text-lg font-bold">
                                    {stat.value}
                                </dt>
                                <dd className="text-muted-foreground mt-1 text-xs">
                                    {stat.label}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* 창가 일러스트 자리 */}
                <div className="bg-muted text-muted-foreground flex aspect-[5/4] items-center justify-center rounded-3xl text-sm">
                    창가 일러스트
                </div>
            </section>

            {/* SLOW BY DESIGN */}
            <section
                id="slow-by-design"
                className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 md:px-6 md:py-24"
            >
                <div className="text-center">
                    <p className="text-muted-foreground text-xs font-semibold tracking-widest">
                        SLOW BY DESIGN
                    </p>
                    <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                        느리게 도착하는 책
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm">
                        빠른 배송 대신, 한 사람을 위해 고르는 시간을 보내드려요.
                    </p>
                </div>
                <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {MOCK_HOME_STEPS.map((step, index) => {
                        const Icon = STEP_ICONS[index];
                        return (
                            <li
                                key={step.title}
                                className="border-border bg-card rounded-2xl border p-6"
                            >
                                <p className="text-muted-foreground text-xs">
                                    {String(index + 1).padStart(2, '0')}
                                </p>
                                <span className="bg-muted mt-4 flex size-10 items-center justify-center rounded-full">
                                    <Icon className="size-4" />
                                </span>
                                <h3 className="mt-4 font-bold">{step.title}</h3>
                                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </li>
                        );
                    })}
                </ol>
            </section>

            {/* BLIND BOOK */}
            <section className="bg-foreground text-background">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
                    {/* 블라인드 책 일러스트 자리 */}
                    <div className="bg-background/10 flex aspect-[4/3] items-center justify-center rounded-3xl text-sm opacity-70">
                        블라인드 책 일러스트
                    </div>
                    <div>
                        <p className="text-xs font-semibold tracking-widest opacity-70">
                            BLIND BOOK
                        </p>
                        <h2 className="mt-2 text-2xl font-bold md:text-4xl">
                            제목은 상자를 열 때
                            <br />
                            알게 됩니다
                        </h2>
                        <p className="mt-6 text-sm leading-relaxed opacity-80">
                            온라인에서 먼저 제목을 알게 되면, 포장을 뜯는 설렘이
                            줄어들어요. 책이 도착하기 전까지는 책방지기가 남긴
                            힌트 한 문장과 함께 보낸 차만 먼저 알려드립니다.
                        </p>
                        <blockquote className="border-background/20 bg-background/5 mt-8 rounded-2xl border p-5">
                            <p className="text-sm font-medium">
                                “비 냄새가 나는 문장들 사이에서, 잠시 우산을
                                접어두시길 바라며.”
                            </p>
                            <footer className="mt-2 text-xs opacity-60">
                                — 상자 속 6자리 코드로 열기
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* CURATED SHELVES */}
            <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
                <SectionHeader
                    eyebrow="CURATED SHELVES"
                    title="네 개의 테마 서가"
                    description="인문, 경제 대신 우분투북스가 오래 붙들어 온 네 가지 이야기로 서가를 나눴어요."
                    linkHref="/bookshelf"
                    linkLabel="테마 서가 보기"
                />
                <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {MOCK_THEME_SHELVES.map((shelf) => (
                        <li key={shelf.id}>
                            <Link
                                href={`/bookshelf?theme=${shelf.id}`}
                                className="bg-muted hover:bg-accent flex aspect-[4/3] flex-col justify-end rounded-2xl p-5 transition-colors"
                            >
                                <h3 className="font-bold md:text-lg">
                                    {shelf.name}
                                </h3>
                                <p className="text-muted-foreground mt-1 text-xs">
                                    {shelf.description}
                                </p>
                                <p className="mt-3 flex items-center gap-1 text-xs">
                                    {shelf.book_count}권
                                    <FiArrowRight className="size-3" />
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* SEASONAL HIGHLIGHT */}
            <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24">
                <SectionHeader
                    eyebrow="SEASONAL HIGHLIGHT"
                    title="가을, 책방지기가 먼저 꺼내 둔 책"
                    description="이번 계절 테마 서가에서 가장 먼저 손이 간 네 권이에요."
                    linkHref="/bookshelf"
                    linkLabel="서가 전체 보기"
                />
                <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
                    {MOCK_SEASONAL_BOOKS.map((book) => (
                        <li key={book.id}>
                            <Link
                                href={`/bookshelf/${book.id}`}
                                className="group"
                            >
                                {/* 책 표지 자리 */}
                                <div className="bg-muted flex aspect-[3/4] items-start rounded-sm p-4 text-sm font-medium transition-opacity group-hover:opacity-80">
                                    {book.title}
                                </div>
                                <h3 className="mt-3 text-sm font-bold">
                                    {book.title}
                                </h3>
                                <p className="text-muted-foreground mt-1 text-xs">
                                    {book.author} · {book.publisher}
                                </p>
                                <p className="text-muted-foreground mt-1 text-xs">
                                    {book.summary}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* ABOUT */}
            <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-16 md:grid-cols-2 md:px-6 md:pb-24">
                {/* 서점 사진 자리 */}
                <div className="bg-muted text-muted-foreground flex aspect-square items-center justify-center rounded-3xl text-sm">
                    서점 외관 / 창가 사진
                </div>
                <div>
                    <p className="text-muted-foreground text-xs font-semibold tracking-widest">
                        ABOUT
                    </p>
                    <h2 className="mt-2 text-2xl font-bold md:text-4xl">
                        어은동 골목,
                        <br />
                        창가에 불이 켜지는 책방
                    </h2>
                    <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
                        우분투(Ubuntu)는 ‘네가 있어 내가 있다’는 뜻이에요. 책 한
                        권이 한 사람에게 닿는 일도 그렇다고 믿어요.
                    </p>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                        우분투북스는 빠르게 팔기보다 오래 머무는 책방이고
                        싶습니다. 그래서 편지를 받고, 읽고, 고르고, 답장하는
                        느린 방식을 택했어요.
                    </p>
                    <dl className="divide-border border-border mt-8 divide-y border-y text-sm">
                        {[
                            ['주소', '대전 유성구 어은동 ○○, 1층'],
                            ['영업시간', '화–일 13:00 – 21:00 · 월 휴무'],
                            [
                                '오시는 길',
                                '대전 지하철 1호선 ○○역 3번 출구 도보 10분',
                            ],
                        ].map(([label, value]) => (
                            <div key={label} className="flex gap-6 py-3">
                                <dt className="text-muted-foreground w-16 shrink-0">
                                    {label}
                                </dt>
                                <dd>{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* 하단 CTA */}
            <section className="bg-muted">
                <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-6 md:py-24">
                    <p className="text-muted-foreground text-xs">
                        이번 달 편지 마감까지 9일
                    </p>
                    <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                        이번 달, 어떤 마음으로 지내고 계신가요?
                    </h2>
                    <p className="text-muted-foreground mt-3 text-sm">
                        그 이야기를 들려주시면, 어울리는 책으로 답장하겠습니다.
                    </p>
                    <Link
                        href="/subscription"
                        className={cn(
                            buttonVariants({ size: 'lg' }),
                            'mt-8 h-12 rounded-full px-7',
                        )}
                    >
                        편지로 구독 시작하기
                    </Link>
                </div>
            </section>
        </div>
    );
}

interface SectionHeaderProps {
    eyebrow: string;
    title: string;
    description: string;
    linkHref: string;
    linkLabel: string;
}

// 테마 서가 / 계절 추천 섹션 공통 제목 영역
function SectionHeader({
    eyebrow,
    title,
    description,
    linkHref,
    linkLabel,
}: SectionHeaderProps) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <p className="text-muted-foreground text-xs font-semibold tracking-widest">
                    {eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-bold md:text-3xl">{title}</h2>
                <p className="text-muted-foreground mt-3 text-sm">
                    {description}
                </p>
            </div>
            <Link
                href={linkHref}
                className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'shrink-0 self-start rounded-full px-4 md:self-auto',
                )}
            >
                {linkLabel}
                <FiArrowRight />
            </Link>
        </div>
    );
}
