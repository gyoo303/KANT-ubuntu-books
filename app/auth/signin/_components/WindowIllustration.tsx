/**
 * 로그인 화면 왼쪽의 "불 꺼진 서점 창가" 일러스트 (장식용 SVG)
 * 시안의 아치형 창문·책장·촛불·편지·우체통을 단순화해서 그렸다.
 * 스크린 리더가 읽을 필요가 없는 장식이라 aria-hidden 처리했다.
 */
export default function WindowIllustration() {
    return (
        <svg
            viewBox="0 0 440 400"
            className="h-auto w-full max-w-[440px]"
            aria-hidden="true"
            focusable="false"
        >
            {/* 배경 카드 + 벽 줄무늬 */}
            <rect width="440" height="400" rx="28" fill="#e6dac4" />
            {[60, 120, 180, 240, 300, 360].map((y) => (
                <line
                    key={y}
                    x1="0"
                    x2="440"
                    y1={y}
                    y2={y}
                    stroke="#d9cbb2"
                    strokeWidth="1.5"
                />
            ))}
            <rect y="386" width="440" height="14" fill="#d6c7ad" />

            {/* 아치형 창틀 */}
            <path
                d="M92 310 V150 A128 128 0 0 1 348 150 V310 Z"
                fill="#6b4a33"
            />
            {/* 밤하늘 */}
            <path
                d="M108 300 V152 A112 112 0 0 1 332 152 V300 Z"
                fill="#2f2a33"
            />
            {/* 별과 달 */}
            <circle cx="150" cy="82" r="1.8" fill="#f3ead8" />
            <circle cx="190" cy="58" r="1.6" fill="#f3ead8" />
            <circle cx="168" cy="122" r="1.4" fill="#f3ead8" />
            <circle cx="246" cy="128" r="1.6" fill="#f3ead8" />
            <path
                d="M276 78 a16 16 0 1 0 14 24 a13 13 0 1 1 -14 -24 Z"
                fill="#f3ead8"
            />

            {/* 창살 */}
            <rect x="216" y="38" width="8" height="262" fill="#6b4a33" />
            <rect x="108" y="160" width="224" height="7" fill="#6b4a33" />

            {/* 책장 2칸 */}
            {[
                { y: 172, h: 46 },
                { y: 226, h: 46 },
            ].map((shelf) => (
                <g key={shelf.y}>
                    {[0, 1].map((side) => {
                        const x0 = side === 0 ? 112 : 228;
                        return [0, 1, 2, 3, 4, 5, 6].map((i) => (
                            <rect
                                key={`${side}-${i}`}
                                x={x0 + i * 14}
                                y={shelf.y + (i % 3) * 5}
                                width="10"
                                height={shelf.h - (i % 3) * 5}
                                fill={i % 2 ? '#4a4450' : '#3c3742'}
                            />
                        ));
                    })}
                    <rect
                        x="108"
                        y={shelf.y + shelf.h}
                        width="224"
                        height="4"
                        fill="#231f27"
                    />
                </g>
            ))}

            {/* 창턱 선반 */}
            <rect
                x="72"
                y="300"
                width="296"
                height="18"
                rx="2"
                fill="#5a3d29"
            />
            <rect x="82" y="318" width="276" height="7" fill="#4a3222" />

            {/* 꺼진 촛불 */}
            <ellipse cx="128" cy="300" rx="20" ry="4" fill="#cdbb9c" />
            <rect
                x="120"
                y="266"
                width="16"
                height="34"
                rx="2"
                fill="#f6efe2"
            />
            <line
                x1="128"
                y1="266"
                x2="128"
                y2="259"
                stroke="#3b3029"
                strokeWidth="1.5"
            />

            {/* 편지 봉투 */}
            <g transform="rotate(-10 180 284)">
                <rect
                    x="156"
                    y="270"
                    width="48"
                    height="30"
                    rx="2"
                    fill="#f7f0e3"
                />
                <path
                    d="M156 270 L180 288 L204 270"
                    fill="none"
                    stroke="#cdbb9c"
                    strokeWidth="1.5"
                />
                <circle cx="180" cy="288" r="4" fill="#c0563a" />
            </g>

            {/* 쌓인 책 */}
            <rect x="244" y="290" width="58" height="10" fill="#3f5a78" />
            <rect x="248" y="281" width="52" height="9" fill="#a0583a" />
            <rect x="250" y="273" width="48" height="8" fill="#56705a" />

            {/* 우체통 */}
            <rect x="396" y="210" width="8" height="176" fill="#5a3d29" />
            <path
                d="M372 230 V206 A28 24 0 0 1 428 206 V230 Z"
                fill="#a07e72"
            />
            <rect x="370" y="228" width="60" height="7" fill="#8c6b60" />
            <rect
                x="388"
                y="214"
                width="22"
                height="3"
                rx="1.5"
                fill="#3b3029"
            />
            <rect x="428" y="216" width="12" height="4" fill="#8c6b60" />
        </svg>
    );
}
