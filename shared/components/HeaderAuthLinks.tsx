'use client';

/**
 * 헤더의 로그인 상태 영역
 * - 비로그인: "로그인" 링크
 * - 로그인: "마이페이지" 링크 + "로그아웃" 버튼
 * - 확인 중(loading): 자리만 차지하고 비워 둔다 (로그인/로그아웃이 깜빡이며 바뀌는 것을 줄임)
 *
 * variant
 * - 'bar': 데스크톱 헤더 오른쪽 (lg 이상에서만 보임)
 * - 'drawer': 햄버거 메뉴 안 (모바일 주 메뉴)
 *
 * 로그아웃은 next-auth/react의 signOut()을 쓴다.
 * 세션 쿠키를 지우고 화면의 로그인 상태(useSession)도 함께 갱신한 뒤 홈으로 보낸다. (확인 화면 없음)
 */
import { cn } from '@/shared/utils/cn';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const STYLES = {
    bar: {
        wrapper: 'hidden items-center gap-4 lg:flex',
        item: 'text-ink-sub hover:text-ink text-xs transition-colors',
    },
    drawer: {
        wrapper: 'flex flex-col',
        item: 'border-line hover:text-olive border-b py-3 text-left text-[15px] transition-colors',
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
                    className={style.item}
                >
                    마이페이지
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
