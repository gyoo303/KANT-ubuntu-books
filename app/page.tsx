import { redirect } from 'next/navigation';

// 바로 다른 주소로 보내는 페이지라 즉시 이동(instant) 검사에서 빼요.
export const instant = false;

// 메인 화면이 정해지기 전까지는 테마 서가로 바로 보냅니다.
export default function HomePage() {
    redirect('/bookshelf');
}
