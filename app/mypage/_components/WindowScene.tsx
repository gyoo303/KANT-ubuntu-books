// 창가 일러스트 — 촛불 위젯 3가지 상태
//   received (13): 밤 창가, 촛불 꺼짐, 창턱에 봉투, 우체통 꺼짐
//   reading  (14): 서점 안 불이 켜지고 촛불 점등, 펼친 편지, 벽까지 번지는 불빛
//   shipped  (15): 밤 창가, 촛불이 막 꺼져 연기, 우체통 점등 (MailboxLamp)
// 좌표는 시안(400 x 551) 기준 px 단위
import type { CandleStatus } from '../_data';
import MailboxLamp from './MailboxLamp';

const WALL_LINES = [148, 203, 257, 312, 366, 421];

// [x, y, width, height, 밤 색, 불 켜진 색]
type Book = [number, number, number, number, string, string];

// 위 칸 책 (선반 상단 y=289)
const BOOKS_TOP: Book[] = [
    [102, 252, 11, 37, '#433d4a', '#9f764d'],
    [115, 257, 8, 32, '#4d4655', '#ba8a55'],
    [125, 248, 13, 41, '#3d3844', '#8f663c'],
    [139, 261, 9, 28, '#514a59', '#c39358'],
    [150, 254, 11, 35, '#47414e', '#ae834f'],
    [164, 251, 7, 38, '#3f3a46', '#9a7146'],
    [211, 256, 12, 33, '#433d4a', '#aa7f4f'],
    [225, 249, 8, 40, '#4d4655', '#be8e59'],
    [236, 260, 13, 29, '#3d3844', '#8c6540'],
    [250, 252, 8, 37, '#524b5a', '#c49864'],
    [260, 256, 11, 33, '#47414e', '#a27c55'],
    [273, 251, 10, 38, '#3f3a46', '#8e6a4a'],
    [285, 261, 11, 28, '#433d4a', '#9c7550'],
];

// 아래 칸 책 (선반 상단 y=340)
const BOOKS_BOTTOM: Book[] = [
    [102, 307, 13, 33, '#433d4a', '#9e7345'],
    [117, 302, 8, 38, '#4d4655', '#bb8646'],
    [128, 313, 11, 27, '#3d3844', '#a0743a'],
    [142, 303, 8, 37, '#524b5a', '#b98955'],
    [153, 309, 12, 31, '#47414e', '#a27c55'],
    [211, 305, 10, 35, '#3f3a46', '#966d43'],
    [223, 301, 12, 39, '#433d4a', '#a1784b'],
    [237, 311, 9, 29, '#47404f', '#b98955'],
    [249, 303, 10, 37, '#3d3844', '#845f3d'],
    [261, 307, 8, 33, '#524b5a', '#c49763'],
    [271, 301, 13, 39, '#47414e', '#a27c55'],
    [286, 309, 11, 31, '#3f3a46', '#8e6a4a'],
];

// 유리 안쪽 색 (밤 / 불 켜짐)
const INTERIOR = {
    night: { sky: '#2f2b36', room: '#36313d', shelf: '#28242d' },
    lit: { sky: '#5a4232', room: '#6a4e3a', shelf: '#4f3826' },
};

// 창틀 바깥(r=118.5) / 유리(r=102) 아치, 중심 (200, 230)
const FRAME_PATH = 'M81.5 372.5V230a118.5 118.5 0 0 1 237 0v142.5Z';
const GLASS_PATH = 'M97.5 372.5V230a102 102 0 0 1 204 0v142.5Z';
const SKY_PATH = 'M97.5 231V230a102 102 0 0 1 204 0v1Z';
const FLAME_PATH =
    'M145.3 303C147.6 308.5 150.8 314.5 150.8 320.5C150.8 326 148.4 330 145.3 330C142.2 330 139.8 326 139.8 320.5C139.8 314.5 143 308.5 145.3 303Z';
const SMOKE_PATH =
    'M145.2 333C143.5 327 143.5 324 144 320S148.5 314 147.7 311S143 306 143.3 303S146.6 297 146.3 294S145.3 290 145.5 288';

const LABEL: Record<CandleStatus, string> = {
    received: '밤의 서점 창가. 촛불은 꺼져 있고 창턱에 편지가 놓여 있어요.',
    reading: '불이 켜진 서점 창가. 촛불 옆에 펼쳐진 편지가 놓여 있어요.',
    shipped: '밤의 서점 창가. 촛불은 막 꺼졌고, 우체통에 불이 켜졌어요.',
};

interface WindowSceneProps {
    status: CandleStatus;
    shipmentId: string;
}

export default function WindowScene({ status, shipmentId }: WindowSceneProps) {
    const lit = status === 'reading';
    const interior = lit ? INTERIOR.lit : INTERIOR.night;

    return (
        <svg
            viewBox="0 0 400 551"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 block h-full w-full"
            role="img"
            aria-label={LABEL[status]}
        >
            <defs>
                <mask id="candle-moon-cut">
                    <rect width="400" height="551" fill="white" />
                    <circle cx="255" cy="173" r="10.5" fill="black" />
                </mask>
                <clipPath id="candle-glass">
                    <path d={GLASS_PATH} />
                </clipPath>
                {/* 14: 창 밖 벽에 번지는 불빛 */}
                <radialGradient
                    id="candle-wall-glow"
                    gradientUnits="userSpaceOnUse"
                    cx="200"
                    cy="354"
                    r="200"
                    gradientTransform="translate(200 354) scale(1 1.3) translate(-200 -354)"
                >
                    <stop offset="0" stopColor="#ecbe6e" stopOpacity="0.26" />
                    <stop offset="0.5" stopColor="#ecbe6e" stopOpacity="0.22" />
                    <stop
                        offset="0.75"
                        stopColor="#ecbe6e"
                        stopOpacity="0.16"
                    />
                    <stop offset="0.9" stopColor="#ecbe6e" stopOpacity="0.07" />
                    <stop offset="1" stopColor="#ecbe6e" stopOpacity="0" />
                </radialGradient>
                {/* 14: 창 안쪽 촛불 빛 */}
                <radialGradient
                    id="candle-flame-glow"
                    gradientUnits="userSpaceOnUse"
                    cx="155"
                    cy="344"
                    r="115"
                >
                    <stop offset="0" stopColor="#ffc464" stopOpacity="0.82" />
                    <stop offset="0.2" stopColor="#ffc464" stopOpacity="0.63" />
                    <stop offset="0.4" stopColor="#ffc464" stopOpacity="0.45" />
                    <stop offset="0.6" stopColor="#ffc464" stopOpacity="0.26" />
                    <stop offset="0.8" stopColor="#ffc464" stopOpacity="0.11" />
                    <stop offset="1" stopColor="#ffc464" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="candle-wax-lit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#f3d39c" />
                    <stop offset="1" stopColor="#f3e8d1" />
                </linearGradient>
            </defs>

            {/* 벽 · 걸레받이 */}
            <rect width="400" height="551" fill="#e5d9c4" />
            {WALL_LINES.map((y) => (
                <rect key={y} y={y} width="400" height="1" fill="#dbcfb9" />
            ))}
            {lit && (
                <rect
                    width="400"
                    height="446.5"
                    fill="url(#candle-wall-glow)"
                />
            )}
            <rect y="446.5" width="400" height="10" fill="#d6c7ae" />

            {/* 우체통 (꺼진 상태 — 15에서는 그 위에 점등 레이어) */}
            <rect x="360" y="328" width="7" height="118.5" fill="#5a3d2b" />
            <path d="M340 303a23.5 16 0 0 1 47 0v25h-47Z" fill="#a07c6e" />
            <rect x="340" y="323" width="47" height="5" fill="#88695c" />
            <rect
                x="353"
                y="308.5"
                width="21"
                height="2.5"
                rx="1.25"
                fill="#3a2a22"
            />
            {status !== 'shipped' && (
                <>
                    <rect
                        x="387"
                        y="313"
                        width="20"
                        height="3"
                        fill="#8e7466"
                    />
                    <rect x="388" y="311" width="3" height="2" fill="#6b4a35" />
                </>
            )}

            {/* 창틀 · 유리 */}
            <path d={FRAME_PATH} fill="#6b4a35" />
            <path d={GLASS_PATH} fill={interior.room} />
            <path d={SKY_PATH} fill={interior.sky} />

            {/* 밤하늘 */}
            {!lit && (
                <g fill="#ede4d0">
                    <circle cx="136.5" cy="166.5" r="1.5" />
                    <circle cx="172.5" cy="146.5" r="1.25" />
                    <circle cx="152.5" cy="204.5" r="1" />
                    <circle cx="223.5" cy="210" r="1.25" />
                    <circle
                        cx="250.5"
                        cy="178.5"
                        r="12.5"
                        mask="url(#candle-moon-cut)"
                    />
                </g>
            )}

            {/* 책장 */}
            {[...BOOKS_TOP, ...BOOKS_BOTTOM].map(
                ([x, y, w, h, night, warm]) => (
                    <rect
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        fill={lit ? warm : night}
                    />
                ),
            )}
            <rect
                x="97.5"
                y="289"
                width="204"
                height="5"
                fill={interior.shelf}
            />
            <rect
                x="97.5"
                y="340"
                width="204"
                height="5"
                fill={interior.shelf}
            />
            {lit && (
                <rect
                    width="400"
                    height="551"
                    fill="url(#candle-flame-glow)"
                    clipPath="url(#candle-glass)"
                />
            )}

            {/* 창살 */}
            <rect x="97.5" y="241.5" width="204" height="5.5" fill="#6b4a35" />
            <rect x="196.5" y="128" width="7" height="244.5" fill="#6b4a35" />

            {/* 창턱 */}
            <rect
                x="65.5"
                y="372.5"
                width="268"
                height="16"
                rx="1.5"
                fill="#5a3d2b"
            />
            <rect x="74.5" y="388.5" width="250" height="7" fill="#47301f" />

            {/* 촛불 */}
            <ellipse cx="145" cy="372" rx="20" ry="4.5" fill="#8c7a66" />
            {lit ? (
                <>
                    <rect
                        x="137.5"
                        y="337.5"
                        width="15.5"
                        height="34"
                        rx="2"
                        fill="url(#candle-wax-lit)"
                    />
                    <rect
                        x="144.5"
                        y="332"
                        width="1.5"
                        height="5.5"
                        fill="#8f6b3a"
                    />
                    <path d={FLAME_PATH} fill="#ffc64a" />
                    <ellipse
                        cx="145.3"
                        cy="322.5"
                        rx="2.7"
                        ry="5"
                        fill="#fff4c8"
                    />
                </>
            ) : (
                <>
                    <rect
                        x="137.5"
                        y="339.5"
                        width="15.5"
                        height="32"
                        rx="2"
                        fill="#f3e9d6"
                    />
                    <rect
                        x="144.25"
                        y="334"
                        width="1.5"
                        height="6"
                        fill="#3a2a22"
                    />
                </>
            )}
            {status === 'shipped' && (
                <path
                    d={SMOKE_PATH}
                    fill="none"
                    stroke="#b4aca2"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                />
            )}

            {/* 쌓인 책 */}
            <rect x="227.5" y="350.5" width="47" height="7" fill="#56705f" />
            <rect x="223.5" y="357.5" width="53" height="7" fill="#8a4b2d" />
            <rect x="221.5" y="364.5" width="57" height="8" fill="#3f4a68" />

            {/* 13: 도착한 봉투 */}
            {status === 'received' && (
                <g transform="translate(189 364) rotate(-8.5)">
                    <rect
                        x="-19.5"
                        y="-12"
                        width="39"
                        height="24"
                        rx="1"
                        fill="#f4ecdd"
                    />
                    <path
                        d="M-19.5 -12 0 2 19.5 -12"
                        fill="none"
                        stroke="#cbbca3"
                        strokeWidth="1"
                    />
                    <circle cx="0.5" cy="2" r="3.5" fill="#c2553a" />
                </g>
            )}

            {/* 14: 펼쳐 읽은 편지 */}
            {status === 'reading' && (
                <g transform="translate(190.5 364.5) rotate(-4.5)">
                    <rect
                        x="-18"
                        y="-6.75"
                        width="36"
                        height="13.5"
                        rx="0.5"
                        fill="#fbf3e4"
                    />
                    <path
                        d="M-13 -2H13M-13 3H5"
                        stroke="#e3d4bd"
                        strokeWidth="1"
                    />
                </g>
            )}

            {/* 15: 우체통 점등 (불빛이 창틀 가장자리까지 번지도록 맨 위에) */}
            {status === 'shipped' && <MailboxLamp shipmentId={shipmentId} />}
        </svg>
    );
}
