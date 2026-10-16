# 협업 규칙 (Conflict 예방)

5명이 한 저장소에서 작업하면서 반복된 conflict를 막기 위한 규칙입니다.
PR #1~#8의 기록에서 conflict가 난 원인을 기준으로 정리했습니다.

| 원인 (실제 사례)                                                   | 막는 규칙                                                                                                                      |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `Header.tsx`가 conflict 4건에 모두 등장                            | [1. 담당 영역](#1-담당-영역) · [2. 공통 영역](#2-공통-영역은-공통-담당자만-수정)                                               |
| 다른 브랜치의 `HeaderMenu.tsx`를 복사, 브랜치가 아닌 커밋에서 분기 | [3. 브랜치](#3-브랜치는-항상-최신-dev에서)                                                                                     |
| `/mypage/page.tsx`를 3명이 각자 생성                               | [4. 라우트](#4-라우트폴더는-담당자만-만든다)                                                                                   |
| `package.json`·`package-lock.json` 동시 수정                       | [5. 의존성](#5-의존성과-lockfile)                                                                                              |
| `prisma/schema.prisma`를 2명이 각자 작성                           | [6. DB 스키마](#6-db-스키마는-한-사람이-관리)                                                                                  |
| 오래된 브랜치, 공통 파일 되돌림, 기록 없는 해결 커밋               | [7. 동기화](#7-dev와-자주-맞추기) · [8. conflict 해결](#8-conflict-해결-방법) · [9. PR 체크리스트](#9-pr-올리기-전-체크리스트) |

---

## 1. 담당 영역

> PR 이력을 기준으로 만든 **초안**입니다. ✅ 표시가 없는 항목은 팀에서 확인 후 고쳐 주세요.

| 영역                                | 경로                                                                                                                                                           | 담당                                                            |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 공통 컴포넌트·디자인 시스템 ✅      | `shared/**`, `app/layout.tsx`, `app/globals.css`, `app/fonts/**`, `app/styleguide/**`, `components.json`                                                       | @gyoo303                                                        |
| 프로젝트 설정 ✅                    | `package.json`의 `scripts`, `.prettierrc`, `.prettierignore`, `eslint.config.mjs`, `next.config.ts`, `tsconfig.json`, `.vscode/**`, `.github/**`, `.claude/**` | @gyoo303                                                        |
| 로그인·회원                         | `app/auth/**`, `auth.ts`, `proxy.ts`                                                                                                                           | @gyoo303                                                        |
| 장바구니·결제                       | `app/cart/**`, `app/api/payments/**`, `domains/cart/**`, `domains/payments/**`                                                                                 | @kimjmin31                                                      |
| 브랜드 스토리                       | `app/about/**`                                                                                                                                                 | @jsa00                                                          |
| 마이페이지 창가의 촛불 (INT-01)     | `app/mypage/page.tsx`, `app/mypage/_components/**`                                                                                                             | @jsa00                                                          |
| 서가·도서 상세                      | `app/bookshelf/**`, `domains/products/**`, `domains/categories/**`                                                                                             | @sanghyuk07a-cpu                                                |
| 마이페이지 레이아웃·언박싱·아카이브 | `app/mypage/layout.tsx`, `app/mypage/unboxing/**`, `app/mypage/archive/**`, `domains/mypage/**`, `domains/shelf-notes/**`                                      | @sanghyuk07a-cpu (jsa00과 확인 필요)                            |
| 메인·정기구독·편지                  | `app/page.tsx`, `app/subscription/**`, `domains/letters/**`, `domains/subscription/**`                                                                         | @uogji-lee                                                      |
| DB 스키마                           | `prisma/**`, `lib/prisma.ts`, `prisma.config.ts`                                                                                                               | 미정 (PR #4·#8 겹침, [6번](#6-db-스키마는-한-사람이-관리) 참고) |

- **자기 영역의 파일만 수정합니다.** 다른 사람 영역을 고쳐야 하면 담당자에게 요청하거나, 담당자의 리뷰를 받는 작은 PR을 따로 올립니다.
- 새 기능 폴더를 만들 때는 먼저 이 표에 한 줄 추가합니다.

## 2. 공통 영역은 공통 담당자만 수정

공통 영역(`shared/**`, `app/layout.tsx`, `app/globals.css` 등)은 모든 화면이 함께 쓰기 때문에 conflict가 가장 많이 났습니다.
PR #7로 공통 컴포넌트와 디자인 요소가 완성되었고, 담당은 @gyoo303입니다.

- **기능 PR에서 공통 파일을 고치지 않습니다.** 헤더 메뉴 추가, 새 색상, 새 공통 컴포넌트가 필요하면 GitHub Issue나 팀 채널로 요청합니다.
- 공통 파일 변경은 **공통 파일만 담은 PR**로 따로 올리고, 다른 기능 PR보다 먼저 merge합니다.
- 화면에는 이미 있는 것을 씁니다.
    - 컴포넌트: `shared/components/ui/*` (`Button`, `Badge`, `Input`, `Card`, `Checkbox`, `RadioGroup`, `Chip` 등)
    - 색: `paper` `paper-2` `card` `letter` `line` `ink` `ink-2` `olive` `olive-soft` `candle` `candle-soft` `post` `sage` `night` `clay`, 글자 회색은 `text-muted-foreground`
    - 글꼴·텍스트: `font-serif` `font-hand`, `typo-display` `typo-h1~h3` `typo-body` `typo-caption` `typo-eyebrow` `typo-letter` `typo-hand`
    - 페이지 너비: `max-w-page`
- `[#636b3a]` 같은 고정 색값과 이전 색 이름(`cream`, `ink-sub`, `ink-muted`, `line-strong`, `olive-dark`, `olive-tint`, `footer*`)은 새 코드에 쓰지 않습니다. 확인할 때는 `/styleguide` 페이지를 봅니다.
- 기능 안에서만 쓰는 컴포넌트는 `domains/<기능>/components/` 또는 `app/<라우트>/_components/`에 둡니다.

## 3. 브랜치는 항상 최신 dev에서

```bash
git fetch origin
git switch -c feature/<기능이름> origin/dev
```

- 다른 사람의 기능 브랜치나 예전 커밋에서 브랜치를 만들지 않습니다.
- **다른 브랜치의 파일을 복사해 오지 않습니다.** 아직 merge되지 않은 코드가 필요하면 그 PR이 merge될 때까지 기다리거나 담당자와 순서를 정합니다.
- 브랜치 이름: `feature/<기능>`, `fix/<내용>`, `chore/<내용>`. PR의 base는 `dev`입니다. `dev`와 `main`에 직접 push하지 않습니다.

## 4. 라우트·폴더는 담당자만 만든다

- 다른 사람 담당 라우트에 **임시 페이지(placeholder)를 만들지 않습니다.** 링크만 걸어 두고, 페이지가 없으면 담당자에게 알립니다.
- 공통 레이아웃(`app/mypage/layout.tsx` 등)이 이미 있는 라우트는 그 안에서 화면만 만듭니다. 사이드바나 바깥 여백을 페이지에서 다시 그리지 않습니다.
- 라우트 목록은 `README.md`의 프로젝트 구조를 따릅니다. 바꿔야 하면 먼저 팀과 합의합니다.

## 5. 의존성과 lockfile

- 패키지를 추가하기 전에 팀 채널에 알립니다. 같은 패키지를 다른 사람이 이미 추가하고 있는지 확인합니다.
- 설치는 `npm install <패키지>`로만 합니다. **`package-lock.json`은 손으로 고치지 않고, 포맷도 하지 않습니다.**
- `package.json`의 `scripts`는 프로젝트 설정 담당만 바꿉니다. OS마다 명령이 다르게 동작하면 직접 고치지 말고 알려 주세요.
- 의존성 변경은 **다른 변경과 섞지 않고 별도 커밋**으로 만듭니다.
- npm은 Node 22 LTS에 들어 있는 버전을 씁니다.

## 6. DB 스키마는 한 사람이 관리

- `prisma/schema.prisma`와 마이그레이션은 **DB 담당 한 사람만** 만들고 고칩니다.
- 다른 사람은 필요한 모델이나 필드를 요청합니다. 각 브랜치에서 `prisma migrate dev`를 따로 실행하지 않습니다(같은 DB에 init 마이그레이션이 두 개 생깁니다).
- 지금 PR #4와 #8이 서로 다른 스키마를 갖고 있습니다. 담당자와 기준 스키마를 먼저 정해야 합니다.

## 7. dev와 자주 맞추기

- 작업을 시작할 때와 PR을 올리기 전에 dev를 내 브랜치에 merge합니다.
    ```bash
    git fetch origin
    git merge origin/dev
    ```
- 이미 push한 브랜치는 rebase나 force push를 하지 않습니다(merge commit 사용).
- PR은 작게, 자주 올립니다. 화면 하나 또는 기능 하나 단위로, **2일 안에 merge**하는 것을 목표로 합니다.
- 공통 PR이 merge되면 진행 중인 PR 담당자는 그날 dev를 merge합니다.

## 8. conflict 해결 방법

dev를 merge하다가 conflict가 나면 파일 종류에 따라 처리합니다.
(내 브랜치에서 `git merge origin/dev`를 하면 `--ours`는 내 브랜치, `--theirs`는 dev입니다.)

| 파일                                     | 해결 방법                                                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 내 영역 파일                             | 양쪽 내용을 확인하고 합칩니다.                                                                                   |
| 다른 사람 영역·공통 영역 파일            | **dev 버전을 그대로 씁니다** (`git checkout --theirs <파일>`). 내 변경이 꼭 필요하면 담당자에게 따로 요청합니다. |
| `package-lock.json`                      | `git checkout --theirs package-lock.json` 후 `npm install`로 다시 만듭니다.                                      |
| `package.json`                           | 양쪽에서 추가한 패키지를 모두 남깁니다. `scripts`는 dev 쪽을 따릅니다.                                           |
| 같은 경로에 각자 새 파일 (add/add)       | 담당 영역 표의 담당자 버전을 남깁니다. 모르겠으면 멈추고 물어봅니다.                                             |
| 한쪽은 수정, 한쪽은 삭제 (modify/delete) | 수정된 쪽을 남깁니다. 삭제가 의도였다면 담당자와 합의 후 별도 PR로 지웁니다.                                     |

해결한 뒤에는 꼭 확인합니다.

```bash
git diff --stat origin/dev...HEAD                 # 내 영역 밖 파일이 없어야 함
git diff --diff-filter=D --name-only origin/dev...HEAD   # 의도하지 않은 삭제가 없어야 함
```

- **conflict가 없어도 merge 결과가 틀릴 수 있습니다.** 다른 사람이 손대지 않은 파일을 내 브랜치에서 지웠다면 conflict 없이 그대로 삭제됩니다. 위 명령으로 확인합니다.
- 해결 커밋 메시지에 어떻게 풀었는지 적습니다. `.` 같은 메시지는 쓰지 않습니다.
    ```
    merge: origin/dev 반영

    - Header.tsx: dev 버전 유지 (공통 영역)
    - package-lock.json: dev 기준으로 npm install 재생성
    ```

## 9. PR 올리기 전 체크리스트

- [ ] 최신 `origin/dev`를 merge했다.
- [ ] `git diff --stat origin/dev...HEAD`에 내 영역 파일만 있다. (공통 파일이 있으면 별도 PR로 나눴다.)
- [ ] 의도하지 않은 삭제가 없다.
- [ ] `npm run format:check`, `npx tsc --noEmit`, `npm test`, `npm run build`가 통과한다.
- [ ] PR 본문에 다음을 적었다: 담당 영역, 공통 영역 변경 여부, 의존성 변경 여부, 겹치는 PR.
- [ ] 리뷰어를 1명 이상 지정했다. 공통 영역이 바뀌면 @gyoo303이 리뷰한다.

## 10. Merge 순서

1. 공통 영역 PR
2. 의존성·DB 스키마 PR
3. 기능 PR (merge 직전에 dev를 다시 merge하고 체크리스트를 확인)

Claude로 작업할 때는 `.claude/skills/team-pr/SKILL.md`가 위 규칙을 자동으로 따르게 합니다.
