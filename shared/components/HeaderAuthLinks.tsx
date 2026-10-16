'use client';

/**
 * 헤더의 로그인 상태 영역
 * - 비로그인: "로그인" 링크
 * - 로그인(소셜 회원가입 직후 포함): "마이페이지" 링크 + "로그아웃" 버튼
 * - 확인 중(loading): 자리만 차지하고 비워 둔다 (로그인/로그아웃이 깜빡이며 바뀌는 것을 줄임)
 *
 * variant
 * - 'bar': 헤더 오른쪽 위
 *   · 마이페이지는 모든 화면 크기에서 보인다 (모바일은 사람 아이콘만, lg 이상은 아이콘+글자)
 *   · 로그인·로그아웃 글자 링크는 lg 이상에서만 보이고, 작은 화면에서는 햄버거 메뉴에서 쓴다
 * - 'drawer': 햄버거 메뉴 안
 *
 * 로그아웃은 next-auth/react의 signOut()을 쓴다.
 * 세션 쿠키를 지우고 화면의 로그인 상태(useSession)도 함께 갱신한 뒤 홈으로 보낸다. (확인 화면 없음)
 */
import { cn } from '@/shared/utils/cn';
import { UserRound } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const STYLES = {
    bar: {
        wrapper: 'flex items-center gap-4',
        item: 'text-ink-2 hover:text-ink hidden text-xs transition-colors lg:inline',
        mypage: 'text-ink-2 hover:text-ink inline-flex items-center gap-1.5 p-1 text-xs transition-colors lg:p-0',
        mypageLabel: 'hidden lg:inline',
    },
    drawer: {
        wrapper: 'flex flex-col',
        item: 'border-line hover:text-olive border-b py-3 text-left text-[15px] transition-colors',
        mypage: 'border-line hover:text-olive border-b py-3 text-left text-[15px] transition-colors',
        mypageLabel: '',
    },
} as const;

export default function HeaderAuthLinks({
    variant,
    onNavigate,
}: {
    variant: keyof typeof STYLES;
    onNavigate?: () => void; // 햄버거 메뉴를 닫을 때 사용
}) {
    const { status } = useSession();
    const style = STYLES[variant];

    if (status === 'loading') {
        return <div className={style.wrapper} aria-hidden />;
    }

    if (status === 'authenticated') {
        return (
            <div className={style.wrapper}>
                <Link
                    href="/mypage"
                    onClick={onNavigate}
                    aria-label="마이페이지"
                    className={style.mypage}
                >
                    {variant === 'bar' && (
                        <UserRound className="size-[18px]" strokeWidth={1.6} />
                    )}
                    <span className={style.mypageLabel}>마이페이지</span>
                </Link>
                <button
                    type="button"
                    onClick={() => {
                        onNavigate?.();
                        void signOut({ redirectTo: '/' });
                    }}
                    className={cn(style.item, 'cursor-pointer')}
                >
                    로그아웃
                </button>
            </div>
        );
    }

    return (
        <div className={style.wrapper}>
            <Link
                href="/auth/signin"
                onClick={onNavigate}
                className={style.item}
            >
                로그인
            </Link>
        </div>
    );
}
