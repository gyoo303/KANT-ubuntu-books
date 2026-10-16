# 🌿 우분투북스 (Ubuntu Books)

> **"네가 있어 내가 있다"**  
> 대형 이커머스의 초고속 배송과 알고리즘 추천 대신, **'의도된 느림(Slow by Design)'**과 **'아날로그적 정서 교감'**을 디지털로 구현한 독립 서점 온라인 플랫폼입니다.

---

## 📖 목차

- [🌿 우분투북스 (Ubuntu Books)](#-우분투북스-ubuntu-books)
    - [📖 목차](#-목차)
    - [🕊️ 프로젝트 비전 및 철학](#️-프로젝트-비전-및-철학)
    - [✨ 핵심 감성 인터랙션 \& 주요 기능](#-핵심-감성-인터랙션--주요-기능)
    - [🔒 사용자 접근 및 권한 정책](#-사용자-접근-및-권한-정책)
    - [🛠 기술 스택 (Tech Stack)](#-기술-스택-tech-stack)
        - [Frontend](#frontend)
        - [Backend \& Database](#backend--database)
    - [📂 프로젝트 구조 (Architecture)](#-프로젝트-구조-architecture)
    - [🚀 시작하기 (Getting Started)](#-시작하기-getting-started)
        - [1. Repository Clone \& Dependency Install](#1-repository-clone--dependency-install)
        - [2. Environment Variables (.env)](#2-environment-variables-env)
        - [3. Database Migration \& Prisma Client](#3-database-migration--prisma-client)
        - [4. Run Development Server](#4-run-development-server)
    - [📡 주요 API 엔드포인트 미리보기](#-주요-api-엔드포인트-미리보기)
    - [📜 License](#-license)

---

## 🕊️ 프로젝트 비전 및 철학

우분투북스는 대전 어은동에 위치한 자연·생태·식문화 중심의 독립 서점입니다.  
디지털 환경 속에서도 책방지기와 독자가 따스하게 교감할 수 있도록 아래의 원칙을 바탕으로 설계되었습니다.

- **Slow by Design (의도된 느림):** 빠르고 즉각적인 구매보다, 한 통의 편지와 책방지기의 손길이 닿는 과정을 소중히 여깁니다.
- **아날로그적 정서 인터랙션:** 무미건조한 택배 추적 대신 **서점 창가의 촛불**로 배송 과정을 전하고, 실물 포장을 열기 전까지 책을 비밀로 간직하는 **디지털 블라인드 북** 경험을 제공합니다.
- **반응형 웹 지원 (Responsive Web):** 모바일, 태블릿, PC 등 어떤 디바이스에서도 서점 특유의 따뜻하고 정갈한 여백을 동일하게 경험할 수 있습니다.

---

## ✨ 핵심 감성 인터랙션 & 주요 기능

| 코드         | 기능명                                   | 설명                                                                                                                                                                                                     |
| :----------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`INT-01`** | **서점 창가의 촛불/조명 위젯**           | 실시간 택배 API 대신, 책방지기가 편지를 읽고 책을 포장하는 상태를 **창가 촛불 점등**과 **우체통 불빛** 애니메이션으로 시각화합니다.                                                                      |
| **`INT-02`** | **독자 편지함 & 점주 작업실**            | 정형화된 체크박스 설문 대신, 편지지 질감의 에디터에 독자가 사연을 띄우면 점주가 단일 화면 작업실에서 이를 확인하고 어울리는 도서를 큐레이션합니다.                                                       |
| **`INT-03`** | **디지털 블라인드 북 & 6자리 코드 해금** | 온라인에서는 선정 힌트(Teaser)만 블라인드 노출되며, 배송 상자에 동봉된 **고유 6자리 난수 코드**를 입력해야 표지와 점주의 편지가 해금됩니다 (QR코드 배제).                                                |
| **`INT-04`** | **나의 서가 아카이브**                   | 공개 리뷰나 별점 평가의 피로 없이, 해금된 책마다 독자가 자신만의 100자 내외 감상이나 문장을 기록하는 비공개 메모장입니다.                                                                                |
| **`INT-05`** | **작별 안부 편지**                       | 공격적인 해지 방어 팝업 대신, 점주의 차분한 작별 서신과 함께 마지막 안부를 나눌 수 있는 따뜻한 구독 해지 여정을 제공합니다.                                                                              |
| **`ADM-01`** | **점주 서재 어드민 데스크**              | 복잡한 2열 분할 뷰 대신 **단일 화면 세로 스크롤 방식**을 적용하여, 독자 편지 열람(촛불 자동 ON) $\rightarrow$ 도서 매칭 및 답장 작성 $\rightarrow$ 6자리 코드 발급 및 발송 처리를 직관적으로 수행합니다. |

---

## 🔒 사용자 접근 및 권한 정책

우분투북스는 책과 브랜드를 둘러보는 데에는 문턱을 두지 않되, 깊이 있는 교감과 거래에는 회원 인증을 거치도록 설계되었습니다.

- **비로그인(게스트) 상태 허용 범위:**
    - 서점 브랜드 소개, 테마별 서가 목록 및 상세 페이지(책방지기 노트) 조회
    - 정기구독 플랜 안내 페이지 조회
    - **장바구니 담기(추가) 및 장바구니 목록 조회/수량 수정**
    - 회원가입 및 소셜 로그인(카카오, 네이버) 진입
- **비회원 인터랙션 제한 (Auth Guard):**
    - **도서/상품 구매(주문하기), 정기구독 신청(편지 쓰기), 마이페이지 메뉴 진입** 시 즉시 로그인/회원가입 페이지(`/auth/signin`)로 자동 리다이렉트됩니다.
    - 로그인 완료 시 시도하던 페이지로 복귀할 수 있도록 `callbackUrl`을 보존합니다.

---

## 🛠 기술 스택 (Tech Stack)

### Frontend

- **Framework:** Next.js 15+ (App Router, React 19)
- **Styling:** Tailwind CSS (어스톤 웜 베이지 & 올리브 컬러 팔레트, 모바일/태블릿/PC 반응형 중단점 지원)
- **Typography:** 리디바탕 (바탕체 계열 웹폰트 적용)
- **Animation:** Framer Motion (창가 촛불 점등, 편지봉투 투입 인터랙션)
- **State Management:** Zustand (장바구니 및 비회원 임시 저장소 관리)
- **Icons:** Lucide React

### Backend & Database

- **Backend:** Next.js Server Actions / Route Handlers
- **Database:** PostgreSQL (Supabase / Neon)
- **ORM:** Prisma ORM
- **Authentication:** NextAuth.js (Auth.js) — 카카오/네이버 소셜 로그인 및 이메일 매직 링크
- **Payments:** 토스페이먼츠 (Toss Payments) — 일반 결제 및 정기 과금(빌링키) API
- **Storage:** AWS S3 / Supabase Storage (도서 표지, 엽서 스캔본)

---

## 📂 프로젝트 구조 (Architecture)

```text
src/
 ├── app/
 │    ├── page.tsx                     # 메인 홈 (반응형 무드보드 & 계절 큐레이션)
 │    ├── auth/
 │    │    └── signin/page.tsx         # 로그인 / 회원가입 페이지 (인증 가드)
 │    ├── about/page.tsx               # [BRD-01] 브랜드 스토리 (우분투 철학 및 어은동 공간)
 │    ├── bookshelf/
 │    │    ├── page.tsx                # [SHP-01] 테마 서가 목록 (반응형 그리드)
 │    │    └── [id]/page.tsx           # [SHP-02] 도서 상세 (책방지기 노트 상단 노출)
 │    ├── cart/page.tsx                # [SHP-03] 장바구니 (비회원 담기/조회 허용)
 │    ├── subscription/
 │    │    ├── page.tsx                # 정기구독 플랜 안내 (Public)
 │    │    └── letter/page.tsx         # [INT-02] 독자 편지 에디터 (Auth Guard)
 │    ├── mypage/                      # [Auth Guard: 회원 전용 대시보드]
 │    │    ├── page.tsx                # [INT-01] 창가의 촛불 위젯 & 구독 현황
 │    │    ├── mailbox/page.tsx        # 내 서신함 (편지 & 답장 열람)
 │    │    ├── unboxing/page.tsx       # [INT-03] 6자리 난수 코드 입력 및 블라인드 북 해금
 │    │    ├── archive/page.tsx        # [INT-04] 나의 서가 아카이브 (개인 한 줄 소감)
 │    │    ├── orders/page.tsx         # 일반 상품 주문/배송 내역
 │    │    └── cancel/page.tsx         # [INT-05] 작별 안부 편지 & 구독 해지
 │    └── admin/                       # [Admin Guard: 점주 전용]
 │         ├── mailbox/page.tsx        # [ADM-01] 서재 작업 데스크 (단일 화면 세로 스크롤)
 │         ├── orders/page.tsx         # [ADM-02] 배송 명단 엑셀 추출
 │         ├── products/page.tsx       # [ADM-03] 도서 등록/수정 CMS
 │         └── farewell/page.tsx       # [ADM-03] 독자 작별 안부 편지 목록
 └── components/
      ├── common/                      # AuthGuard, 반응형 레이아웃 컨테이너
      ├── candle-widget/               # 창가 배경 SVG, 촛불/우체통 애니메이션
      ├── letter/                      # 편지지 에디터, 우체통 제출 애니메이션
      ├── blind-box/                   # 블라인드 티저 카드, 6자리 난수 코드 모달, 한 줄 메모 폼
      └── shared/                      # 반응형 Gnb(모바일 햄버거 메뉴 포함), Footer
```

---

## 🚀 시작하기 (Getting Started)

### 1. Repository Clone & Dependency Install

```bash
git clone https://github.com/your-username/ubuntu-books.git
cd ubuntu-books
npm install
```

### 2. Environment Variables (.env)

`.env.example`을 `.env`로 복사한 뒤 값을 채웁니다. 네이버 로그인 로컬 테스트에는 아래 3개만 있으면 됩니다.
**Docker, DB, 메일 서버는 필요 없습니다.**

```env
AUTH_SECRET="..."        # npx auth secret 으로 생성
AUTH_NAVER_ID="..."
AUTH_NAVER_SECRET="..."
ADMIN_EMAILS=""          # (선택) 임시 관리자 이메일, 쉼표로 구분
```

네이버 개발자센터에서 애플리케이션을 등록할 때:

- 사용 API: 네이버 로그인 / 제공 정보: **이메일(필수)**, 이름
- 서비스 URL: `http://localhost:3000`
- Callback URL: `http://localhost:3000/api/auth/callback/naver`
- 검수 전("개발 중")에는 앱 등록자와 **멤버관리에 등록한 네이버 아이디만** 로그인할 수 있습니다.

### 3. Run Development Server

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 플랫폼을 확인합니다.

### 4. 로그인 테스트

1. `/mypage`에 접속하면 `/auth/signin?callbackUrl=...`로 이동합니다 (로그인 필요 페이지).
2. **네이버로 계속하기**를 누르면 네이버 로그인 후 원래 페이지로 돌아옵니다. 처음이면 자동으로 가입됩니다.
3. 헤더에 마이페이지 · 로그아웃이 보이면 성공입니다.
4. 장바구니(`/cart`)에서 **구매 계속하기** → 배송지의 연락처 칸에서 휴대폰 번호를 입력합니다 (가입 때는 받지 않음).

### ⚠️ 임시 상태 (TODO)

| 항목                  | 현재                                      | 나중에                                      |
| --------------------- | ----------------------------------------- | ------------------------------------------- |
| `TODO(db)`            | DB 없음. 로그인은 JWT 쿠키만 사용         | Prisma 어댑터 + `npx prisma migrate dev`    |
| 회원 id               | `naver:<네이버 사용자 고유번호>`          | DB `User.id`                                |
| 관리자 권한           | `.env`의 `ADMIN_EMAILS`                   | DB `User.role`                              |
| 내 연락처·기본 배송지 | 브라우저 LocalStorage (이 브라우저에서만) | DB `User.phone` · 회원 배송지               |
| `TODO(email)`         | 이메일 가입·로그인 꺼짐                   | Nodemailer + `docker-compose.yml`의 Mailpit |
| `TODO(kakao)`         | 카카오 로그인 꺼짐                        | 비즈 앱 전환 후 활성화                      |

---

## 📡 주요 API 엔드포인트 미리보기

- **감성 구독 및 마이페이지 (Member Only)**
    - `POST /api/v1/letters` : 점주에게 보내는 편지 우체통 제출
    - `GET /api/v1/letters/current-status` : 창가 촛불/우체통 위젯 상태 조회
    - `POST /api/v1/curator/unlock` : 실물 택배 6자리 고유 난수 코드로 책 해금
    - `POST /api/v1/shelf-notes` : 나의 서가 비공개 한 줄 메모 등록
    - `POST /api/v1/subscriptions/farewell` : 작별 안부 편지 전송 및 정기구독 해지
- **도서 & 커머스**
    - `GET /api/v1/products` : 테마별 서가 목록 조회 (`Public`)
    - `GET /api/v1/cart`, `POST /api/v1/cart` : 비회원/회원 장바구니 조회 및 상품 추가 (`Public`)
    - `POST /api/v1/orders` : 주문 생성 및 결제 승인 (`Member Only`)
- **점주 어드민 데스크 (Admin Only)**
    - `PATCH /api/v1/admin/letters/:id/reading` : 편지 열람 시작 (독자 화면 촛불 ON)
    - `POST /api/v1/admin/letters/:id/curate` : 단일 스크롤 화면에서 도서 매칭, 6자리 난수 코드 발행 및 발송 처리
    - `GET /api/v1/admin/subscribers/excel` : 택배사 맞춤 배송지 엑셀 다운로드

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
