import MypageNav, {
    MypageNavLinks,
} from '@/domains/mypage/components/MypageNav';
import type { MypageUser } from '@/domains/shelf-notes/types/shelfNote.types';
import { Suspense } from 'react';

export default function MypageSidebar({ user }: { user: MypageUser }) {
    const nextBilling = user.plan.next_billing_at.replaceAll('-', '.');

    return (
        <aside>
            {/* 프로필 */}
            <div className="bg-olive-soft text-olive/90 grid size-[52px] place-items-center rounded-full text-[16px]">
                {user.name.slice(0, 1)}
            </div>
            <p className="font-serif mt-7 text-[22px]">{user.name} 독자님</p>
            <p className="text-muted-foreground mt-1.5 text-[12.5px]">
                우분투북스와 {user.season_count}번째 계절
            </p>

            <div className="border-line mt-6 mb-[18px] border-t" />

            {/* 현재 페이지 표시에 주소를 써서 Suspense 로 감싸요 */}
            <Suspense fallback={<MypageNavLinks pathname={null} />}>
                <MypageNav />
            </Suspense>

            {/* 구독 플랜 */}
            <div className="border-line mt-8 rounded-xl border px-5 py-[18px]">
                <p className="text-ink-2 text-[13px]">구독 중인 플랜</p>
                <p className="mt-2 text-[16px] font-bold">{user.plan.name}</p>
                <p className="text-ink-2 mt-1.5 text-[13px]">
                    다음 결제 {nextBilling}
                </p>
            </div>
        </aside>
    );
}
