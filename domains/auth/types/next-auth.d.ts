import type { DefaultSession } from 'next-auth';

type UserRole = 'MEMBER' | 'ADMIN';

declare module 'next-auth' {
    interface User {
        role?: UserRole;
        phone?: string | null;
    }
    interface Session {
        user: { role: UserRole } & DefaultSession['user'];
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        role?: UserRole;
    }
}
