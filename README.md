# 파일 구조

- api : api 정의
- assets : 정적 파일
- mocks : mock 데이터
- pages : 페이지 컴포넌트
- routes : 라우트 정의
- store : 상태 관리 (Redux toolkit)   
</br>

# 다이어그램
![프론트엔드 다이어그램](.\docs\프론트엔드_다이어그램.png)


# 소스코드 세부내용

## src/App.jsx
- 애플리케이션 루트 컴포넌트
- Redux Provider와 React Router를 설정하여 전체 라우팅과 상태 관리 담당

## src/main.jsx
- 프로젝트의 진입점
- 개발 환경(env.DEV)에서 Mock Service Worker를 실행하고, ReactDOM을 통해 App 렌더링
</br>

## src/routes 디렉토리

## index.jsx
- 모든 페이지 라우팅 정의
- 로그인/회원가입/도서 전체 목록(홈)/도서 상세정보/도서 추가/도서 수정과 같은 주요 페이지 라우팅
- 로그인과 같이 인증이 필요한 경로는 ProtectedRoute로 보호
</br>

## src/pages 디렉토리

### Home.jsx
- 로그인 후 라우팅되는 메인 페이지
- 도서 전체 목록 조회, 검색 필터링, 도서 추가, 로그아웃 기능 제공

### Register.jsx & Login.jsx 
- 회원가입 및 로그인 폼 페이지
- 각각 회원가입 & 로그인 API와 연동

### BookDetail.jsx
- 각 도서(bookID)의 상세 정보를 보여주는 페이지
- 도서 수정 및 삭제, 도서 전체 목록(홈)으로 돌아가기 기능 제공

### BookForm.jsx
- 도서 추가 및 수정 폼 페이지
- 도서 표지 이미지 생성, 입력값 관리, 도서 등록 및 수정 API 연동
</br>

## src/api 디렉토리

### axios.js
- Axios 인스턴스 및 공통 설정(기본 URL, 헤더, 토큰 처리) 정의

## auth.js
- 사용자 인증(로그인, 회원가입) API 요청 함수 정의

## books.js
- 도서 처리(CRUD) API 요청 함수 정의
</br>

## src/store 디렉토리

### authSlice.js & store.js
- Redux Toolkit을 이용한 사용자 인증 상태 관리 및 스토어 설정
</br>

## src/mocks 디렉토리

### handlers.js & browser.js
- Mock Service Worker 핸들러 및 Worker 설정
- 개발 환경에서 API 요청을 mock 데이터로 응답하도록 설정
</br>

## src/components 디렉토리  

### BookFormFields.jsx & ErrorContainer.jsx
- 도서 폼 입력 필드, 에러 표시와 같은 재사용 가능 UI 컴포넌트