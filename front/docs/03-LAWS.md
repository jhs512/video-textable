# 법률 (Laws)

> 헌법의 원칙을 실제 운영 규칙으로 내린 것. 구체적이고 즉시 적용 가능하다.

---

## 디렉토리 구조

```
front/src/
├── app/              # Next.js App Router 페이지 (조합만 담당)
├── components/       # 재사용 가능한 UI 컴포넌트
│   ├── ui/           # 범용 UI (Button, Input, Modal 등)
│   └── [domain]/     # 도메인별 컴포넌트
├── hooks/            # 커스텀 훅
├── lib/              # 유틸리티, API 클라이언트, 헬퍼
├── types/            # 공유 타입 정의
└── constants/        # 상수 정의
```

## 네이밍 규칙

- 컴포넌트 파일: `PascalCase.tsx` (예: `VideoPlayer.tsx`)
- 훅 파일: `use` 접두사 + `camelCase.ts` (예: `useVideoPlayer.ts`)
- 유틸 파일: `camelCase.ts` (예: `formatTime.ts`)
- 타입 파일: `camelCase.ts` (예: `video.ts`)
- 상수 파일: `camelCase.ts`, 내부 상수는 `UPPER_SNAKE_CASE`

## 컴포넌트 규칙

- 한 컴포넌트 파일은 하나의 export default만 가진다.
- Props 타입은 컴포넌트와 같은 파일에 정의하고 `interface [컴포넌트명]Props`로 명명한다.
- 컴포넌트 내부 로직이 30줄을 넘으면 커스텀 훅으로 분리한다.

## 페이지 규칙

- `app/` 내의 `page.tsx`는 컴포넌트를 조합만 한다.
- 페이지에 직접 비즈니스 로직을 작성하지 않는다.
- 데이터 패칭은 Server Component 또는 전용 훅에서 처리한다.

## import 규칙

- 외부 라이브러리 → 내부 절대경로 → 상대경로 순서로 import한다.
- `@/` 경로 별칭을 사용한다.
- 순환 import를 금지한다.

## 타입 규칙

- `any` 사용 금지. 불가피한 경우 `unknown`을 사용하고 타입 가드를 작성한다.
- API 응답 타입은 `types/` 디렉토리에 정의한다.
- 유니온 타입보다 discriminated union을 선호한다.

## 코드 품질 규칙 (Guard 사법부)

Guard는 테스트만이 아니라 **코드 품질 전체를 집행**한다.
`pnpm run check` 한 번으로 모든 품질 검사를 실행한다.

```
pnpm run check
  = format → tsc → lint → test
```

| 스크립트 | 역할 | 도구 |
|---|---|---|
| `format` | 코드 포맷팅 + import 순서 정렬 | Prettier + @trivago/prettier-plugin-sort-imports |
| `tsc` | 타입 검사 (빌드 없이) | TypeScript `tsc --noEmit` |
| `lint` | 정적 분석 | ESLint |
| `test` | 단위 테스트 + API 모킹 테스트 | Vitest + MSW |

- **코드를 작성하거나 수정한 후에는 반드시 `pnpm run check`를 실행한다.**
- 모든 단계가 통과해야 Guard를 통과한 것으로 간주한다.
- 하나라도 실패하면 Build를 머지하지 않는다.

## 테스트 규칙

- 테스트 파일은 `__tests__/` 디렉토리 또는 `[파일명].test.ts(x)`로 작성한다.
- 각 테스트는 독립적으로 실행 가능해야 한다.
- 외부 의존성은 MSW로 mock 처리한다.

## 포맷팅 규칙

- Prettier로 코드 스타일을 통일한다.
- import 순서: 외부 라이브러리 → `@/types` → `@/constants` → `@/lib` → `@/hooks` → `@/components` → 상대경로
- 세미콜론 사용, 더블 쿼트, trailing comma(es5)

## 참고 프로젝트

- 구현 시 `~/Custom/markdown_video` 프로젝트를 참고한다. (롤 모델 프로젝트)
- 마크다운→영상 변환의 구조, 패턴, 컴포넌트 설계를 학습하고 적용한다.
