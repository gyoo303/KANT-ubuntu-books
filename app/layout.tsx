import AuthSessionProvider from '@/shared/components/AuthSessionProvider';
import Footer from '@/shared/components/Footer';
import Header from '@/shared/components/Header';
import type { Metadata } from 'next';
import { Nanum_Pen_Script, Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

// 인터페이스·본문 (font-sans)
const notoSansKr = Noto_Sans_KR({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '900'],
    display: 'swap',
    variable: '--font-noto-sans-kr',
});

// 제목·편지 본문 (font-serif)
const ridiBatang = localFont({
    src: './fonts/RIDIBatang.woff2',
    weight: '400',
    display: 'swap',
    variable: '--font-ridi-batang',
});

// 손편지 (font-hand) — 일부 화면에서만 쓰므로 preload 하지 않음
const nanumPenScript = Nanum_Pen_Script({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    preload: false,
    variable: '--font-nanum-pen-script',
});

export const metadata: Metadata = {
    title: '우분투북스',
    description:
        '대전 어은동 골목의 작은 책방. 편지를 받고, 책으로 답장합니다.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="ko"
            className={`${notoSansKr.variable} ${ridiBatang.variable} ${nanumPenScript.variable} h-full`}
        >
            <body className="flex min-h-screen flex-col break-keep antialiased">
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
