/**
 * [마이페이지] 주소: /mypage  (회원 전용 - proxy.ts가 비로그인 접근을 로그인 화면으로 보낸다)
 *
 * TODO(mypage): 임시 화면. 마이페이지 담당(INT-01 창가의 촛불 위젯 & 구독 현황)이 실제 화면으로 교체한다.
 * 지금은 헤더의 "마이페이지" 메뉴로 들어왔을 때 404 대신 로그인한 회원 정보를 보여주는 용도다.
 *
 * Suspense를 쓰는 이유: cacheComponents: true라서 요청마다 달라지는 세션 읽기(auth())는
 * <Suspense> 안에서 해야 한다.
 */
import { auth } from '@/auth';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: '마이페이지 · 우분투북스',
};

export default function MyPage() {
    return (
        <div className="max-w-page mx-auto w-full px-6 py-20">
            <p className="typo-eyebrow text-olive">MY PAGE</p>
            <Suspense fallback={<h1 className="typo-h2 mt-3">마이페이지</h1>}>
                <Greeting />
            </Suspense>
            <div className="border-line bg-card mt-10 rounded-2xl border p-8">
                <p className="typo-body text-ink-2">
                    창가의 촛불, 서신함, 나의 서가는 곧 이곳에서 만나요.
                </p>
                <Link
                    href="/cart"
                    className="text-olive mt-4 inline-block text-sm underline-offset-4 hover:underline"
                >
                    장바구니로 가기
                </Link>
            </div>
        </div>
    );
}

async function Greeting() {
    const session = await auth();
    const name = session?.user?.name ?? '독자';
    return (
        <>
            <h1 className="typo-h2 mt-3">{name}님의 창가</h1>
            {session?.user?.email && (
                <p className="typo-caption text-muted-foreground mt-2">
                    {session.user.email}
                </p>
            )}
        </>
    );
}
