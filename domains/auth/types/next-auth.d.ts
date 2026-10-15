/**
 * Auth.js 타입 확장 (TypeScript 모듈 보강, module augmentation)
 *
 * Auth.js의 기본 User / Session / JWT 타입에는 role, phone 같은 우리 필드가 없다.
 * `declare module`로 라이브러리의 interface에 필드를 "추가 선언"하면,
 * session.user.role 같은 코드를 타입 에러 없이 쓸 수 있다.
 * (실제 값을 채우는 곳은 auth.config.ts의 jwt / session 콜백)
 */
import type { DefaultSession } from 'next-auth';

type UserRole = 'MEMBER' | 'ADMIN';

declare module 'next-auth' {
    /** DB User와 provider profile()이 돌려주는 값 */
    interface User {
        role?: UserRole;
        phone?: string | null;
    }
    /** auth() / useSession()이 돌려주는 값 */
    interface Session {
        user: { role: UserRole } & DefaultSession['user'];
    }
}

/**
 * JWT 타입은 next-auth/jwt가 @auth/core/jwt를 다시 내보내는 구조라서
 * 원본 모듈(@auth/core/jwt)을 보강해야 적용된다.
 */
declare module '@auth/core/jwt' {
    interface JWT {
        role?: UserRole;
    }
}
