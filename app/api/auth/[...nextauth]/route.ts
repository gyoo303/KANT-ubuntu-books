/**
 * Auth.js 라우트
 *
 * [...nextauth]는 "catch-all" 동적 라우트로, /api/auth/ 아래 모든 경로를 이 파일이 받는다.
 * Auth.js가 경로를 보고 알아서 처리한다. 예:
 * - GET  /api/auth/csrf                 CSRF 토큰 발급
 * - POST /api/auth/signin/naver         네이버 로그인 시작
 * - GET  /api/auth/callback/naver       네이버 인증 후 돌아오는 곳 (개발자센터 Callback URL)
 * - POST /api/auth/signin/nodemailer    매직 링크 메일 발송
 * - GET  /api/auth/callback/nodemailer  메일 속 링크를 눌렀을 때 오는 곳
 * - GET  /api/auth/session              현재 세션 조회 (useSession이 사용)
 * - POST /api/auth/signout              로그아웃
 */
import { handlers } from '@/auth';

export const { GET, POST } = handlers;
