/**
 * PrismaClient 싱글톤
 *
 * PrismaClient는 생성될 때마다 DB 커넥션 풀을 새로 연다.
 * 개발 모드(next dev)에서는 파일을 저장할 때마다 모듈이 다시 로드(HMR)되는데,
 * 그때마다 new PrismaClient()가 실행되면 커넥션이 쌓여 "too many connections" 에러가 난다.
 * 그래서 globalThis(모듈 재로드와 상관없이 유지되는 전역 객체)에 1개만 만들어 두고 재사용한다.
 * 프로덕션은 모듈이 한 번만 로드되므로 전역에 보관할 필요가 없다.
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
