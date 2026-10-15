'use client';

/**
 * [테스트용 로그인/로그아웃 버튼] - 헤더에 들어간다
 * 누를 때마다 가짜 로그인 상태(mockAuth)를 켜고 끈다.
 * 로그인 상태면 "로그아웃", 아니면 "로그인"이라고 보인다.
 *
 * TODO: 로그인 페이지(다른 담당)가 생기면 이 버튼을 빼고,
 *       Header.tsx에 주석 처리해 둔 원래 /login 링크 버튼으로 되돌리기
 */
import { Button } from '@/shared/components/ui/button';
import { setMockLoggedIn, useMockLoggedIn } from '@/shared/mocks/mockAuth';
import { FiUser } from 'react-icons/fi';

// TODO: 로그인 페이지(다른 담당)가 생기면 /login 링크로 되돌리기
export default function MockLoginButton() {
    const loggedIn = useMockLoggedIn(); // 현재 가짜 로그인 상태

    return (
        <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 px-2.5 md:px-3"
            onClick={() => setMockLoggedIn(!loggedIn)} // 누를 때마다 반대로 바꾼다
        >
            <FiUser className="h-3.5 w-3.5" />
            <span className="text-xs md:text-sm">
                {loggedIn ? '로그아웃' : '로그인'}
            </span>
        </Button>
    );
}
