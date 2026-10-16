/**
 * [로그인 페이지] 주소: /auth/signin?callbackUrl=…&error=…
 *
 * 로그인과 회원가입을 한 화면으로 통합했다.
 * 소셜 로그인은 처음 온 사람이면 자동으로 가입, 이미 가입한 사람이면 로그인으로 처리되기 때문이다.
 * - 이메일 가입·로그인 영역(입력 폼, 약관 동의, "또는 이메일로")은 TODO(email)로 빠졌다.
 * - 휴대폰 번호는 가입 때 받지 않고, 첫 결제 때 배송지 연락처로 받는다.
 *
 * 화면 구성
 * - 왼쪽(lg 이상): 불 꺼진 서점 창가 일러스트 + 문구 (모바일에서는 숨김)
 * - 오른쪽: 제목, 들어온 이유 안내(callbackUrl), 오류 안내(error), 소셜 로그인 버튼
 *
 * Suspense를 쓰는 이유: 이 프로젝트는 cacheComponents: true라서
 * 요청마다 달라지는 searchParams 읽기를 <Suspense> 안에서 해야 한다.
 */
import { signInWithNaver } from '@/app/auth/signin/actions';
import SocialSubmitButton from '@/app/auth/signin/_components/SocialSubmitButton';
import WindowIllustration from '@/app/auth/signin/_components/WindowIllustration';
import {
    getSignInErrorMessage,
    getSignInNotice,
} from '@/domains/auth/utils/signInMessages';
import { AlertCircle, Lock } from 'lucide-react';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: '로그인 · 우분투북스',
};

// 주소의 ?뒤 값들 (Next 16에서는 Promise로 들어온다)
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function SignInPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    return (
        <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
            {/* 왼쪽: 창가 일러스트 (lg 이상에서만) */}
            <section className="bg-paper-2 hidden flex-col items-center justify-center gap-12 px-12 py-20 lg:flex">
                <WindowIllustration />
                <p className="typo-h3 text-center">
                    창가에 불이 꺼져 있어요.
                    <br />
                    편지를 기다리고 있을게요.
                </p>
            </section>

            {/* 오른쪽: 로그인 */}
            <section className="flex items-center px-6 py-16 lg:px-20">
                <div className="mx-auto w-full max-w-[480px]">
                    <h1 className="typo-h2">어서 오세요</h1>
                    <p className="typo-body text-ink-2 mt-3">
                        네이버 계정으로 시작하면 처음 오신 분은 자동으로
                        가입돼요.
                    </p>

                    <Suspense fallback={<SignInForm callbackUrl={undefined} />}>
                        <SignInContent searchParams={searchParams} />
                    </Suspense>

                    <p className="typo-caption text-muted-foreground mt-8 text-center">
                        휴대폰 번호는 첫 주문 때 배송 연락처로만 받아요.
                    </p>
                </div>
            </section>
        </div>
    );
}

// searchParams(callbackUrl, error)를 읽어 안내 박스와 버튼을 그린다
async function SignInContent({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams;
    const callbackUrl = firstValue(params.callbackUrl);
    const notice = getSignInNotice(callbackUrl);
    const errorMessage = getSignInErrorMessage(firstValue(params.error));

    return (
        <>
            {errorMessage && (
                <div
                    role="alert"
                    className="bg-post/10 text-post mt-8 flex gap-3 rounded-xl px-5 py-4 text-sm"
                >
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    <p>{errorMessage}</p>
                </div>
            )}
            {notice && (
                <div className="bg-olive-soft mt-8 flex gap-3 rounded-xl px-5 py-4 text-sm">
                    <Lock className="mt-0.5 size-4 shrink-0" />
                    <div>
                        <p>{notice.title}</p>
                        <p className="text-ink-2 mt-1">{notice.description}</p>
                    </div>
                </div>
            )}
            <SignInForm callbackUrl={callbackUrl} />
        </>
    );
}

// 소셜 로그인 버튼 묶음. callbackUrl을 Server Action에 미리 묶어(bind) 넘긴다.
function SignInForm({ callbackUrl }: { callbackUrl: string | undefined }) {
    return (
        <div className="mt-8 space-y-3">
            {/* TODO(kakao): 카카오 provider 활성화 후 버튼 노출
            <form action={signInWithKakao.bind(null, callbackUrl)}>
                <SocialSubmitButton
                    className="bg-[#FEE500] text-[#191919]"
                    icon={<MessageCircle className="size-5" />}
                    label="카카오로 계속하기"
                />
            </form>
            */}
            <form action={signInWithNaver.bind(null, callbackUrl)}>
                <SocialSubmitButton
                    className="bg-[#03C75A] text-white"
                    icon={
                        <span aria-hidden className="text-lg font-black">
                            N
                        </span>
                    }
                    label="네이버로 계속하기"
                />
            </form>
        </div>
    );
}

function firstValue(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}
