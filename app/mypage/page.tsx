import { redirect } from 'next/navigation';

// 바로 다른 주소로 보내는 페이지라 즉시 이동(instant) 검사에서 빼요.
export const instant = false;

// TODO: README상 /mypage 는 [INT-01] 창가의 촛불 화면 자리예요.
// 그 화면이 생기기 전까지만 이달의 언박싱으로 보내고, 생기면 이 파일을 그 화면으로 바꿔 주세요.
export default function MypagePage() {
    redirect('/mypage/unboxing');
}
