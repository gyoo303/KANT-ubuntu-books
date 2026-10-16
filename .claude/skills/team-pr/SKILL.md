---
name: team-pr
description: 우분투북스 팀 저장소에서 코드를 만들고 PR을 올리는 공통 절차. 브랜치 만들기, 화면·기능 구현, 파일 수정, 패키지 설치, 커밋, dev merge, conflict 해결, PR 생성 중 하나라도 할 때 반드시 먼저 읽는다. 담당 영역 밖 수정, 공통 파일 수정, lockfile·DB 스키마 충돌을 막는다.
---

# 팀 PR 절차 (conflict 예방)

이 저장소는 5명이 함께 씁니다. 규칙의 원본은 저장소 루트의 `CONTRIBUTING.md`입니다.
**작업을 시작하기 전에 `CONTRIBUTING.md`의 "1. 담당 영역" 표를 읽습니다.** 이 문서에는 표를 다시 적지 않습니다.

아래 단계를 순서대로 따릅니다. "멈추고 묻기"라고 적힌 곳에서는 사용자에게 확인을 받기 전까지 진행하지 않습니다.

## 0. 누구의 작업인지 확인

1. `git config user.name`, `git config user.email`, 사용자가 말한 GitHub ID로 작업자를 정합니다. 모르면 **멈추고 묻기**.
2. 담당 영역 표에서 이 작업자가 고칠 수 있는 경로(이하 "내 영역")를 정리해 사용자에게 한 줄로 보여 줍니다.
3. 요청한 작업이 내 영역 밖 파일을 고쳐야 한다면 **멈추고 묻기**. 아래 중 하나를 고르게 합니다.
    - 담당자에게 보낼 요청문(Issue 초안)만 작성하기
    - 내 영역 안에서만 해결하는 다른 방법
    - 담당자 리뷰를 받는 별도 작은 PR로 분리하기

## 1. 브랜치 만들기

```bash
git fetch origin
git status --short          # 비어 있지 않으면 사용자에게 알리고 멈춘다
git switch -c feature/<기능> origin/dev
```

- 항상 `origin/dev`에서 만듭니다. 다른 기능 브랜치, 예전 커밋, `main`에서 만들지 않습니다.
- 이미 작업 중인 브랜치라면 1-1로 갑니다.

### 1-1. 기존 브랜치에서 이어서 작업

```bash
git fetch origin
git merge origin/dev
```

conflict가 나면 6단계로 갑니다. 이미 push한 브랜치는 rebase, amend, force push를 하지 않습니다.

## 2. 코드 작성 규칙

### 수정해도 되는 파일

- 내 영역 파일만 만들고 고칩니다.
- 공통 영역(`shared/**`, `app/layout.tsx`, `app/globals.css`, `app/fonts/**`, `app/styleguide/**`, 설정 파일)은 **절대 고치지 않습니다.** 공통 담당자(@gyoo303)의 작업이고 사용자가 그 사람일 때만 예외입니다.
- 헤더 메뉴(`shared/constants/navigation.ts`) 한 줄 추가도 공통 영역 변경입니다. 요청문을 만들어 줍니다.
- 다른 사람 담당 라우트에 임시 `page.tsx`를 만들지 않습니다. 링크만 겁니다.
- 다른 브랜치의 파일을 복사해 오지 않습니다. `git checkout <다른 브랜치> -- <파일>`, `git show <다른 브랜치>:<파일> > ...`도 금지입니다.
- 내 영역의 파일이라도 **작업과 관계없는 줄을 고치거나 포맷만 바꾸지 않습니다.**

### 공통 디자인 쓰기 (PR #7 기준)

- 컴포넌트는 `shared/components/ui/*`를 먼저 찾습니다: `Button`, `Badge`(상태 톤 `neutral` `candle` `post` `sage` `night`, `dot`), `Input`, `Card`, `Checkbox`, `RadioGroup`, `Chip`, `Dialog`, `DropdownMenu`.
- 색은 토큰만 씁니다: `paper` `paper-2` `card` `letter` `line` `ink` `ink-2` `olive` `olive-soft` `candle` `candle-soft` `post` `sage` `night` `clay`, 글자 회색은 `text-muted-foreground`. `bg-muted`는 연한 배경(`paper-2`)입니다.
- 글꼴·텍스트는 `font-serif` `font-hand`, `typo-*` 유틸리티를 씁니다. 페이지 너비는 `max-w-page`입니다.
- 쓰지 않는 것: `[#hex]` 고정 색, 이전 색 이름(`cream`, `cream-deep`, `ink-sub`, `ink-muted`, `footer-muted`, `line-strong`, `olive-dark`, `olive-tint`, `footer`, `footer-text`, `footer-line`).
- 필요한 공통 컴포넌트나 토큰이 없으면 직접 `shared/`에 만들지 말고, 기능 폴더(`domains/<기능>/components/` 또는 `app/<라우트>/_components/`)에 만든 뒤 PR 본문에 "공통화 후보"로 적습니다.
- 라우트에 이미 `layout.tsx`가 있으면 그 레이아웃이 그리는 부분(사이드바, 바깥 여백)을 페이지에서 다시 그리지 않습니다. 작업 전에 해당 라우트의 `layout.tsx`를 읽습니다.

### 의존성

- 새 패키지가 필요하면 **멈추고 묻기**. 팀에 알렸는지 확인합니다.
- 설치는 `npm install <패키지>`만 씁니다. `package-lock.json`을 직접 편집하거나 prettier로 포맷하지 않습니다.
- `package.json`의 `scripts`는 바꾸지 않습니다.
- 의존성 변경은 별도 커밋으로 만듭니다.

### DB 스키마

- `prisma/**`, `lib/prisma.ts`, `prisma.config.ts`는 DB 담당만 고칩니다. 다른 작업자는 필요한 모델·필드를 요청문으로 만듭니다.
- `prisma migrate dev`는 DB 담당의 작업에서만 실행합니다.

## 3. 포맷

바꾼 파일에만 prettier를 실행합니다. 저장소 전체(`prettier --write .`)를 포맷하지 않습니다.

```bash
git diff --name-only --diff-filter=AM origin/dev...HEAD \
  | grep -E '\.(ts|tsx|js|mjs|css|md|json)$' | grep -v package-lock.json \
  | xargs -r npx prettier --write
```

## 4. 커밋

- 메시지 형식: `feat: ...`, `fix: ...`, `style: ...`, `refactor: ...`, `chore: ...`, `docs: ...` + 한국어 설명.
- `.`, `수정`, `update`처럼 내용이 없는 메시지는 쓰지 않습니다.
- 의존성 변경, 기능 코드, 포맷 변경을 한 커밋에 섞지 않습니다.

## 5. PR 올리기 전 점검 (매번 실행)

```bash
git fetch origin
git merge origin/dev                                   # conflict → 6단계

# (1) 바뀐 파일이 모두 내 영역인지
git diff --stat origin/dev...HEAD

# (2) 의도하지 않은 삭제가 없는지 (conflict 없이 삭제되는 경우가 있음)
git diff --diff-filter=D --name-only origin/dev...HEAD

# (3) 열려 있는 다른 PR 브랜치와 겹치는 파일
for b in $(git branch -r --format='%(refname:short)' | grep -vE 'origin/(dev|main|HEAD)$|^origin$'); do
  [ "$b" = "origin/$(git branch --show-current)" ] && continue
  overlap=$(comm -12 <(git diff --name-only origin/dev...HEAD | sort) <(git diff --name-only origin/dev..."$b" | sort))
  [ -n "$overlap" ] && echo "== $b" && echo "$overlap"
done

# (4) 검사
npm run format:check
npx tsc --noEmit
npm test
npm run build
```

결과를 다음 기준으로 판단합니다.

- (1)에 내 영역 밖 파일이 있으면 **멈추고 묻기**. 되돌리거나(`git checkout origin/dev -- <파일>`) 별도 PR로 나눕니다.
- (2)에 결과가 있으면 하나씩 이유를 사용자에게 보여 주고 확인을 받습니다.
- (3)에서 겹치는 파일이 있으면 사용자에게 알리고 PR 본문의 "겹치는 PR"에 적습니다. 같은 경로의 새 파일이 겹치면 **멈추고 묻기**.
- (4)가 실패하면 고친 뒤 다시 실행합니다. 실패를 숨기거나 테스트를 건너뛰지 않습니다.

## 6. conflict 해결

`git merge origin/dev` 중에는 `--ours` = 내 브랜치, `--theirs` = dev입니다.
`git status`로 conflict 파일을 보고, 파일마다 아래 표대로 처리합니다. 처리 방법을 정하기 전에 각 파일의 담당자를 담당 영역 표에서 확인합니다.

| 파일                          | 처리                                                                                              |
| ----------------------------- | ------------------------------------------------------------------------------------------------- |
| 내 영역 파일                  | 양쪽 변경을 모두 읽고 합칩니다. 한쪽을 통째로 버리지 않습니다.                                    |
| 공통 영역·다른 사람 영역 파일 | `git checkout --theirs <파일>`로 dev 버전을 씁니다. 내 쪽 변경이 꼭 필요하면 요청문으로 남깁니다. |
| `package-lock.json`           | `git checkout --theirs package-lock.json && npm install`                                          |
| `package.json`                | 양쪽 의존성을 모두 남기고, `scripts`는 dev 쪽을 따릅니다. 이후 `npm install`.                     |
| 같은 경로 새 파일 (add/add)   | 담당자 쪽 버전을 남깁니다. 담당자가 불분명하면 **멈추고 묻기**.                                   |
| modify/delete                 | 수정된 쪽을 남깁니다(`git add <파일>`). 삭제는 담당자 합의 후 별도 PR.                            |
| `prisma/**`, 마이그레이션     | **멈추고 묻기**. 자동으로 풀지 않습니다.                                                          |

해결 후:

1. `grep -rn '<<<<<<<\|>>>>>>>' -- app domains shared lib prisma`로 표시가 남았는지 확인합니다.
2. 5단계의 (1)·(2)·(4)를 다시 실행합니다.
3. 커밋 메시지에 파일별 처리 내용을 적습니다.
    ```
    merge: origin/dev 반영

    - shared/components/Header.tsx: dev 버전 유지 (공통 영역)
    - package-lock.json: dev 기준으로 npm install 재생성
    ```

## 7. push와 PR

- `git push -u origin <내 브랜치>`만 합니다. `dev`, `main`에 push하지 않습니다. force push를 하지 않습니다.
- PR base는 `dev`입니다. 사용자가 PR 생성을 요청했을 때만 만듭니다.
- PR 본문에 다음을 적습니다.

```markdown
## 개요

## 담당 영역

- 작업자: @...
- 바뀐 경로: ...

## 공통 영역 변경

- 없음 / 있음 (별도 PR #..)

## 의존성·DB 변경

- 없음 / 추가: ...

## 겹치는 PR

- 없음 / #.. (겹치는 파일: ...)

## 공통화 후보

- 없음 / ...

## 검증

- [ ] format:check - [ ] tsc - [ ] test - [ ] build
```

## 하지 말 것 (요약)

- 내 영역 밖 파일 수정, 다른 사람 라우트에 임시 페이지 만들기
- 다른 브랜치에서 파일 복사, 다른 기능 브랜치에서 브랜치 만들기
- `package-lock.json` 직접 편집·포맷, `scripts` 변경, 알리지 않은 패키지 추가
- 저장소 전체 포맷, 작업과 관계없는 줄 수정
- 공유 브랜치 rebase·force push, `dev`·`main` 직접 push
- conflict를 한쪽 파일 통째로 덮어써서 해결, 내용 없는 커밋 메시지
