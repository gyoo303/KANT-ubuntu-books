import { SHOP_INFO } from '@/shared/constants/shop';
import Link from 'next/link';

const FOOTER_COLUMNS = [
    { title: '책방', lines: [SHOP_INFO.address, SHOP_INFO.hoursShort] },
    {
        title: '문의',
        lines: [SHOP_INFO.phone, `카카오톡 채널 ${SHOP_INFO.kakao}`],
    },
];

const NEWS_LINKS = [
    { href: '#', label: '인스타그램' },
    { href: '#', label: '어은동 편지 (뉴스레터)' },
];

export default function Footer() {
    return (
        <footer className="bg-ink text-line mt-auto w-full pt-14 pb-7 text-xs leading-[1.8]">
            <div className="max-w-page mx-auto w-full px-6">
                {/* 메인 정보: 모바일 세로 -> md 이상 좌우 배치 */}
                <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-8 md:flex-row">
                    <div>
                        <p className="mb-[18px] text-[17px] font-medium text-white">
                            우분투북스
                        </p>
                        <p>
                            대전 어은동 골목의 작은 책방.
                            <br />
                            편지를 받고, 책으로 답장합니다.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-[repeat(3,auto)] md:gap-14">
                        {FOOTER_COLUMNS.map((col) => (
                            <div key={col.title}>
                                <h3 className="mb-3 text-xs font-bold text-white">
                                    {col.title}
                                </h3>
                                {col.lines.map((line) => (
                                    <p key={line}>{line}</p>
                                ))}
                            </div>
                        ))}
                        <div>
                            <h3 className="mb-3 text-xs font-bold text-white">
                                소식
                            </h3>
                            {NEWS_LINKS.map((link) => (
                                <p key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 하단 사업자 정보 */}
                <div className="text-muted-foreground flex flex-col justify-between gap-6 pt-5 text-[11px] md:flex-row">
                    <p>
                        상호 우분투북스 · 대표 ○○○ · 사업자등록번호 000-00-00000
                        · 통신판매업 신고 0000-대전유성-0000
                    </p>
                    <p className="shrink-0">
                        <Link
                            href="#"
                            className="hover:text-line transition-colors"
                        >
                            이용약관
                        </Link>
                        {' · '}
                        <Link
                            href="#"
                            className="hover:text-line transition-colors"
                        >
                            개인정보처리방침
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
