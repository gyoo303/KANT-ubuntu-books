/**
 * 로그인 화면(/auth/signin)에 보여줄 안내·오류 문구
 *
 * 화면 컴포넌트와 분리해 두면 문구 규칙을 테스트하기 쉽고, 디자인이 바뀌어도 그대로 쓸 수 있다.
 */

export interface SignInNotice {
    title: string;
    description: string;
}

/**
 * callbackUrl(로그인 후 돌아갈 곳)에 따라 "왜 로그인이 필요한지" 안내 문구를 고른다.
 * proxy가 붙여 주는 callbackUrl은 절대 URL(http://host/cart)이라 경로만 뽑아서 판단한다.
 * 표시용이므로 origin은 검사하지 않는다. (실제 이동 주소 검증은 Server Action과 redirect 콜백이 한다)
 * 돌아갈 곳이 없거나 홈('/')이면 안내 박스를 보여주지 않는다(null).
 */
export function getSignInNotice(
    callbackUrl: string | null | undefined,
): SignInNotice | null {
    const path = toPathname(callbackUrl);
    if (!path || path === '/') return null;

    if (path.startsWith('/cart')) {
        return {
            title: '주문하려면 로그인이 필요해요.',
            description: '로그인하면 담아둔 장바구니로 바로 돌아가요.',
        };
    }
    if (path.startsWith('/subscription')) {
        return {
            title: '편지를 쓰려면 로그인이 필요해요.',
            description: '로그인하면 쓰던 편지지로 바로 돌아가요.',
        };
    }
    if (path.startsWith('/mypage')) {
        return {
            title: '나의 창가를 보려면 로그인이 필요해요.',
            description: '로그인하면 마이페이지로 바로 돌아가요.',
        };
    }
    if (path.startsWith('/admin')) {
        return {
            title: '점주 작업실은 로그인이 필요해요.',
            description: '점주 계정으로 로그인해 주세요.',
        };
    }
    return {
        title: '로그인이 필요한 페이지예요.',
        description: '로그인하면 보던 페이지로 바로 돌아가요.',
    };
}

/**
 * Auth.js가 /auth/signin?error=<코드> 로 보내 줄 때 보여줄 문구.
 * 별도 오류 화면 없이 로그인 화면 상단에서 안내한다.
 * 코드가 없으면 null.
 */
export function getSignInErrorMessage(
    error: string | null | undefined,
): string | null {
    if (!error) return null;
    switch (error) {
        case 'AccessDenied':
            return '로그인이 취소되었거나 허용되지 않았어요. 다시 시도해 주세요.';
        case 'OAuthAccountNotLinked':
            return '이미 다른 방법으로 가입한 이메일이에요. 처음 가입한 방법으로 로그인해 주세요.';
        case 'Configuration':
            return '로그인 설정에 문제가 있어요. 잠시 후 다시 시도해 주세요.';
        default:
            return '로그인 중 문제가 생겼어요. 다시 시도해 주세요.';
    }
}

function toPathname(raw: string | null | undefined): string | null {
    if (!raw) return null;
    if (raw.startsWith('/')) return raw.split(/[?#]/)[0];
    try {
        return new URL(raw).pathname;
    } catch {
        return null;
    }
}
