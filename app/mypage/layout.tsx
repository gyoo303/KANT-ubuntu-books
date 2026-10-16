import MypageSidebar from '@/domains/mypage/components/MypageSidebar';
import { getCurrentUser } from '@/domains/shelf-notes/api/shelfNoteApi';
import { Nanum_Pen_Script, Noto_Serif_KR } from 'next/font/google';

// 마이페이지 공통: 바탕색, 글꼴(바탕체·손글씨), 왼쪽 사이드바
const notoSerifKr = Noto_Serif_KR({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    display: 'swap',
    variable: '--font-noto-serif-kr',
});

const nanumPen = Nanum_Pen_Script({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-nanum-pen',
});

// TODO: 회원 전용 (로그인 연결 후 비로그인이면 /auth/signin?callbackUrl=... 로 이동)
export default async function MypageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    return (
        <div
            className={`${notoSerifKr.variable} ${nanumPen.variable} bg-ub-bg text-ub-ink pb-24`}
        >
            <div className="mx-auto grid max-w-[1168px] gap-10 px-4 pt-10 md:grid-cols-[232px_1fr] md:gap-16 md:px-6 md:pt-14">
                <MypageSidebar user={user} />
                <div className="min-w-0">{children}</div>
            </div>
        </div>
    );
}
