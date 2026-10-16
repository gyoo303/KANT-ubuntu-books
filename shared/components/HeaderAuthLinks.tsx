'use client';

/**
 * 헤더의 로그인 상태 영역
 * - 비로그인: "로그인" 링크
 * - 로그인(소셜 회원가입 직후 포함): 마이페이지로 가는 회원 버튼 [이름 첫 글자 아바타 + "OO 님"]
 * - 확인 중(loading): 자리만 차지하고 비워 둔다 (로그인/회원 버튼이 깜빡이며 바뀌는 것을 줄임)
 *
 * variant
 * - 'bar': 헤더 오른쪽 위 (시안: 장바구니 아이콘 옆)
 *   · 회원 버튼은 모든 화면 크기에서 보인다 (모바일은 아바타만, lg 이상은 아바타 + "OO 님")
 *   · 로그인 링크는 lg 이상에서만 보이고, 작은 화면에서는 햄버거 메뉴에서 쓴다
 *   · 로그아웃은 시안대로 헤더 바에 두지 않고 햄버거 메뉴에 둔다
 * - 'drawer': 햄버거 메뉴 안 (마이페이지 · 로그아웃 / 로그인)
 *
 * 로그아웃은 next-auth/react의 signOut()을 쓴다.
 * 세션 쿠키를 지우고 화면의 로그인 상태(useSession)도 함께 갱신한 뒤 홈으로 보낸다. (확인 화면 없음)
 */
import {
    getAvatarInitial,
    getDisplayName,
} from '@/domains/auth/utils/displayName';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const DRAWER_ITEM =
    'border-line hover:text-olive cursor-pointer border-b py-3 text-left text-[15px] transition-colors';

export default function HeaderAuthLinks({
    variant,
    onNavigate,
}: {
    variant: 'bar' | 'drawer';
    onNavigate?: () => void; // 햄버거 메뉴를 닫을 때 사용
}) {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div aria-hidden className={variant === 'bar' ? 'w-8' : ''} />;
    }

    // ── 비로그인 ──
    if (status !== 'authenticated') {
        return (
            <Link
                href="/auth/signin"
                onClick={onNavigate}
                className={
                    variant === 'bar'
                        ? 'text-ink-2 hover:text-ink hidden text-xs transition-colors lg:inline'
                        : DRAWER_ITEM
                }
            >
                로그인
            </Link>
        );
    }

    // ── 로그인 ──
    const name = getDisplayName(session.user);

    if (variant === 'bar') {
        return (
            <Link
                href="/mypage"
                aria-label={`${name} 님 마이페이지`}
                className="group inline-flex items-center gap-2"
            >
                {/* 이름 첫 글자 아바타 */}
                <span
                    aria-hidden
                    className="bg-olive-soft text-ink group-hover:bg-olive group-hover:text-paper inline-flex size-8 items-center justify-center rounded-full text-[13px] font-medium transition-colors"
                >
                    {getAvatarInitial(name)}
                </span>
                <span className="text-ink-2 group-hover:text-ink hidden max-w-32 truncate text-[13px] transition-colors lg:inline">
                    {name} 님
                </span>
            </Link>
        );
    }

    return (
        <div className="flex flex-col">
            <Link href="/mypage" onClick={onNavigate} className={DRAWER_ITEM}>
                마이페이지 ({name} 님)
            </Link>
            <button
                type="button"
                onClick={() => {
                    onNavigate?.();
                    void signOut({ redirectTo: '/' });
                }}
                className={DRAWER_ITEM}
            >
                로그아웃
            </button>
        </div>
    );
}
