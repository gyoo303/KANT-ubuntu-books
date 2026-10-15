import { Noto_Serif_KR } from 'next/font/google';

// 테마 서가 화면 공통: 바탕색 + 제목용 세리프 폰트
const notoSerifKr = Noto_Serif_KR({
    subsets: ['latin'],
    weight: ['500', '600'],
    display: 'swap',
    variable: '--font-noto-serif-kr',
});

export default function BookshelfShell({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${notoSerifKr.variable} bg-ub-bg text-ub-ink pb-20`}>
            <div className="mx-auto max-w-[980px] px-4 md:px-6">{children}</div>
        </div>
    );
}
