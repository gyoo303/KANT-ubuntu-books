import MypageSidebar from '@/domains/mypage/components/MypageSidebar';
import { getCurrentUser } from '@/domains/shelf-notes/api/shelfNoteApi';

// 마이페이지 공통: 바탕색, 왼쪽 사이드바 (글꼴은 app/layout.tsx 의 팀 공통 글꼴 사용)
// TODO: 회원 전용 (로그인 연결 후 비로그인이면 /auth/signin?callbackUrl=... 로 이동)
export default async function MypageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();

    return (
        <div className="bg-paper text-ink pb-24">
            <div className="max-w-page mx-auto grid gap-10 px-4 pt-10 md:grid-cols-[232px_1fr] md:gap-16 md:px-6 md:pt-14">
                <MypageSidebar user={user} />
                <div className="min-w-0">{children}</div>
            </div>
        </div>
    );
}
