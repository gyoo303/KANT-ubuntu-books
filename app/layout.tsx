import AuthSessionProvider from '@/shared/components/AuthSessionProvider';
import Footer from '@/shared/components/Footer';
import Header from '@/shared/components/Header';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

// Noto Sans KR 폰트 인스턴스 생성
const notoSansKr = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '900'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Team Sparta Shopping Mall',
    description: 'AX1 프론트앤드 프로젝트',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className="h-full">
            <body
                className={`${notoSansKr.className} bg-cream text-ink flex min-h-screen flex-col break-keep antialiased`}
            >
                {/* 로그인 상태(useSession)를 헤더·장바구니 등 클라이언트 컴포넌트에서 읽기 위한 Provider */}
                <AuthSessionProvider>
                    <Header />
                    <main className="w-full flex-1">{children}</main>
                    <Footer />
                </AuthSessionProvider>
            </body>
        </html>
    );
}
