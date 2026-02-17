# 🎬 Storyboard Maker

영상 제작을 위한 웹 기반 스토리보드 작성 도구입니다.
씬(Scene)과 컷(Shot)을 쉽게 추가, 삭제, 편집할 수 있으며, 각 컷에 구도(Composition), 사이즈(Size), 렌즈(Lens) 정보를 설정할 수 있습니다.

## 🌟 주요 기능

### 📋 스토리보드 관리
- **스토리보드 생성/삭제**: 새로운 스토리보드를 만들고 관리
- **로컬 자동 저장**: 브라우저 로컬 스토리지에 자동 저장
- **내보내기**: JSON 파일로 스토리보드 내보내기

### 🎥 씬 관리
- **씬 추가/삭제**: 영상의 각 장면(씬)을 추가/삭제
- **씬 설명**: 각 씬에 대한 상세 설명 작성 가능

### 📸 컷 관리
- **컷 추가/삭제**: 씬 내 각 컷 추가/삭제
- **구도 선택**:
  - 전체 샷 (Wide Shot)
  - 중간 샷 (Medium Shot)
  - 클로즈업 (Close Up)
  - 극단적 클로즈업
  - 하이앵글 (High Angle)
  - 로우앵글 (Low Angle)
  - 더치앵글 (Dutch Angle)

- **사이즈 선택**:
  - 전신 (Full Body)
  - 허리 위 (Waist Up)
  - 가슴 위 (Bust Up)
  - 머리&어깨 (Head & Shoulder)
  - 얼굴만 (Head Only)
  - 물체 포커스 (Object Focus)

- **렌즈 선택**:
  - 24mm (광각)
  - 35mm
  - 50mm (표준)
  - 85mm (포트레이트)
  - 105mm
  - 200mm (망원)

- **설명 및 노트**: 각 컷에 대한 상세 설명과 노트 작성

## 🚀 시작하기

### 설치

```bash
# 프로젝트 디렉토리로 이동
cd storyboard-maker

# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 빌드

```bash
npm run build
npm run start
```

## 🧪 테스트 실행

```bash
npm test
```

모든 비즈니스 로직은 Jest로 작성된 테스트를 통과합니다.

## 📁 프로젝트 구조

```
storyboard-maker/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 메인 페이지
│   └── globals.css         # 전역 스타일
├── components/
│   ├── StoryboardContext.tsx  # 전역 상태 관리
│   ├── ScenePanel.tsx         # 씬 표시 컴포넌트
│   ├── ShotCard.tsx           # 컷 표시 컴포넌트
│   └── ExportButton.tsx       # 내보내기 버튼
├── lib/
│   ├── storyboard.ts       # 비즈니스 로직
│   ├── storyboard.test.ts  # 테스트 코드
│   └── storage.ts          # 로컬 스토리지 관리
├── types/
│   └── storyboard.ts       # TypeScript 타입 정의
└── public/                 # 정적 파일
```

## 💾 데이터 저장

모든 스토리보드는 브라우저의 로컬 스토리지에 자동 저장됩니다.
- **저장 위치**: 브라우저 로컬 스토리지 (localStorage)
- **자동 저장**: 모든 변경사항이 자동으로 저장됨
- **내보내기**: JSON 파일로 다운로드 가능

## 🛠️ 기술 스택

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest
- **Storage**: Browser LocalStorage

## 📝 라이선스

MIT

## 🤝 기여

버그 리포트 및 기능 요청은 환영합니다!

---

**TDD(Test-Driven Development) 방식으로 개발되었습니다.**
모든 비즈니스 로직은 테스트를 먼저 작성한 후 구현되었습니다.
