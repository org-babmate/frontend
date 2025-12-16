# Babmate Web

여행자(게스트)와 호스트를 매칭해 식사/로컬 경험을 예약·관리하는 Next.js 16 기반 웹앱입니다. 이메일/구글 로그인, 프로필 관리, 경험(Experience) 탐색과 필터링, 호스트 등록 플로우, SSE 알림 등 주요 기능이 포함되어 있습니다.

## 주요 기능
- 인증: 이메일/비밀번호 로그인·회원가입, 구글 OAuth 리다이렉트, 비밀번호 찾기/재설정, 세션 저장(Zustand + sessionStorage).
- 탐색(Discover): 카테고리/게스트 인원/가격/언어/평점/날짜 필터와 무한 스크롤로 경험 목록 조회.
- 경험 관리: 호스트 등록 6단계 스텝(UI만 준비), 게스트/호스트별 경험·스케줄 API 래퍼 제공.
- 프로필: 내 프로필 조회/수정, 이미지 업로드(사전 서명 URL) 및 관심사/성향/언어 태그 노출.
- UI/레이아웃: 커스텀 헤더, 검색 메뉴, 사이드 시트(언어/통화/내비게이션/로그아웃), 역할 전환 스위치, 공용 Form/Input 컴포넌트.
- 알림: 로그인 시 `/notifications/sse` SSE를 통해 실시간 알림 텍스트 수신(useEventSource 훅).

## 기술 스택
- Framework: Next.js 16 (App Router), React 19
- Styling: Tailwind CSS v4, tw-animate-css, 커스텀 폰트(Geist, Suit)
- Data: @tanstack/react-query, axios
- Form/Validation: react-hook-form, zod
- 상태: Zustand (auth-store, profile-store)
- Etc: date-fns, lucide-react, Radix UI(시트, 드롭다운, 스위치 등)

## 환경 변수
프로젝트 루트에 `.env.local`을 만들고 API 엔드포인트를 설정하세요.
```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```
- 모든 API/SSE/구글 OAuth 리다이렉트가 이 값을 사용합니다(`apiClient`, `/auth/google`, `/notifications/sse`).
- 쿠키 기반 인증이므로 백엔드 CORS/withCredentials 설정이 필요합니다.

## 프로젝트 구조 (Feature-Sliced)
- `src/app`: Next.js 라우트, 전역 레이아웃/스타일.
- `src/entities`: API 타입·클라이언트 래퍼(예: `auth`, `experiences`, `user`).
- `src/features`: 사용자 상호작용 단위(로그인/회원가입, 프로필 수정, 경험 필터 등).
- `src/processes`: 세션/프로필 등 글로벌 상태 처리.
- `src/shared`: 공용 컴포넌트, 훅, API 클라이언트, 타입.
- `src/widget`: 페이지 구성을 위한 섹션 컴포넌트(히어로, 탐색, 사이드 시트 등).

## 설치 및 실행
```bash
npm install
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
npm run lint     # ESLint 검사
npm run format   # Prettier 포맷 (src/**/*.{js,jsx,ts,tsx,json,md})
```

## 주요 페이지 흐름
- `/` 홈: 히어로 + 검색 메뉴, Babmate 카드 리스트, 인기 카테고리/경험 미리보기.
- `/discover`: 카테고리/필터 + 무한 스크롤 경험 카드(`useExperiencesInfiniteQuery`).
- `/login`, `/signup`: 이메일/비밀번호 폼 + 구글 로그인 버튼.
- `/resetPassword`, `/restorePassword`: 비밀번호 찾기 및 재설정 폼.
- `/experience`: 호스트 경험 등록 6단계 UI(카테고리 → 이름 → 설명/이미지 → 위치 → 인원/가격 → 일정).
- `/myprofile`: 내 프로필 조회/편집, 이미지 업로드(사전 서명 URL).

## 데이터/상태 처리
- `src/shared/api/client.ts`: axios 기본 클라이언트(`withCredentials: true`, 쿼리 파라미터 직렬화 포함).
- `src/processes/auth-session/use-auth-store.ts`: 세션 토큰 저장/초기화.
- `src/entities/experiences/model/*.ts`: 경험/스케줄 조회·등록·수정·삭제용 API 래퍼(게스트/호스트 분리).
- `src/shared/lib/hooks/use-event-source.ts`: SSE 연결 관리(상태 관리, 자동 JSON 파싱).
- `src/features/.../validation.ts`: zod 기반 폼 검증 스키마.

## 참고 사항
- React Query Devtools는 `src/app/layout.tsx`에서 주석 해제 후 사용 가능합니다.
- Tailwind v4를 사용하므로 PostCSS 플러그인 없이 `@import 'tailwindcss';` 방식으로 동작합니다.
- 이미지 업로드는 presigned URL 기반이며, 업로드 성공 시 반환된 `publicUrl`을 프로필에 저장합니다.
