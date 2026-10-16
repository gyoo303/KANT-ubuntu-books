/**
 * PrismaClient 싱글톤
 *
 * TODO(db): DB가 정해질 때까지 사용하지 않는다. (auth.ts의 어댑터와 함께 꺼 둠)
 * DB를 켤 때 아래 주석을 풀고, .env의 DATABASE_URL 설정 후 `npx prisma migrate dev`를 실행한다.
 * 지금 import하면 Prisma Client 생성(prisma generate)과 DB 접속이 필요해져서 주석 처리했다.
 *
 * [왜 싱글톤인가]
 * PrismaClient는 생성될 때마다 DB 커넥션 풀을 새로 연다.
 * 개발 모드(next dev)에서는 파일을 저장할 때마다 모듈이 다시 로드(HMR)되는데,
 * 그때마다 new PrismaClient()가 실행되면 커넥션이 쌓여 "too many connections" 에러가 난다.
 * 그래서 globalThis(모듈 재로드와 상관없이 유지되는 전역 객체)에 1개만 만들어 두고 재사용한다.
 */
// import { PrismaClient } from '@prisma/client';
//
// const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
//
// export const prisma = globalForPrisma.prisma ?? new PrismaClient();
//
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export {};
