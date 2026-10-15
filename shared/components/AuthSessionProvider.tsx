'use client';

/**
 * 로그인 상태를 화면(클라이언트 컴포넌트) 어디서나 읽을 수 있게 해 주는 Provider
 *
 * SessionProvider 안쪽의 컴포넌트는 useSession()으로 현재 로그인 상태를 읽는다.
 * - status: 'loading'(확인 중) | 'authenticated'(로그인) | 'unauthenticated'(비로그인)
 * - data: { user: { id, name, email, image, role }, expires }
 * 내부적으로 /api/auth/session을 호출해 쿠키의 JWT 세션을 확인한다.
 * (서버 컴포넌트·API에서는 useSession 대신 auth()를 쓴다)
 */
import { SessionProvider } from 'next-auth/react';

export default function AuthSessionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SessionProvider>{children}</SessionProvider>;
}
