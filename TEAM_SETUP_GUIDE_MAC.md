# 🎬 스토리보드 메이커 - 맥(Mac) 사용자 설치 가이드

맥(macOS) 사용자분들을 위한 설치 및 사용 가이드입니다.

---

## 📋 필수 준비물

설치하기 전에 다음을 확인하세요:

### 1️⃣ Node.js 설치 확인

**터미널에서:**
```bash
node --version
npm --version
```

만약 설치되지 않았다면:

#### 방법 A: Homebrew 사용 (권장)

```bash
# Homebrew 설치 (처음 한 번만)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js 설치
brew install node
```

#### 방법 B: 공식 웹사이트에서 설치

1. https://nodejs.org/ 접속
2. LTS 버전 다운로드
3. 설치 파일 실행 후 지시사항 따르기

#### 설치 확인
```bash
node --version
npm --version
```

---

## 🚀 설치 방법 (2가지)

### 방법 A: GitHub에서 clone (권장) ⭐

이 방법이 가장 간단하고 업데이트도 쉽습니다.

#### 단계 1: Git 설치 확인

```bash
git --version
```

만약 설치되지 않았다면:
```bash
brew install git
```

#### 단계 2: 저장소 복제

```bash
git clone https://github.com/[리더_이름]/storyboard-maker.git
cd storyboard-maker
```

**설명**: 당신의 리더가 제공한 GitHub URL을 사용하세요.

#### 단계 3: 의존성 설치

```bash
npm install
```

**설명**: 필요한 패키지들을 자동으로 다운로드합니다 (1-2분 소요).

#### 단계 4: 개발 서버 실행

```bash
npm run dev
```

**예상 출력:**
```
> storyboard-maker@1.0.0 dev
> next dev

▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://192.168.x.x:3000

✓ Ready in 819ms
```

#### 단계 5: 브라우저에서 열기

주소창에 입력:
```
http://localhost:3000
```

✅ 완료! 스토리보드 메이커가 실행됩니다.

---

### 방법 B: 파일/USB로 받은 경우

#### 단계 1: 폴더 복사

받은 `storyboard-maker` 폴더를 원하는 위치에 복사

```bash
예: ~/Desktop/storyboard-maker
또는: ~/Documents/storyboard-maker
```

#### 단계 2: 터미널 열기

**방법 1:**
- Finder에서 폴더 우클릭 → "새로운 터미널 윈도우 열기"

**방법 2:**
- Spotlight 검색 (Cmd + Space) → "터미널" 입력 → Enter

#### 단계 3: 폴더로 이동

```bash
cd ~/Desktop/storyboard-maker
```

또는 터미널에 폴더를 드래그 앤 드롭

#### 단계 4: 의존성 설치 및 실행

```bash
npm install
npm run dev
```

#### 단계 5: 브라우저에서 열기

```
http://localhost:3000
```

---

## 🎯 사용 방법

### 새 스토리보드 만들기

1. **"새 스토리보드" 버튼** 클릭
2. 제목 입력 (예: "CF 광고 촬영")
3. 설명 입력 (선택사항)
4. **생성** 클릭

### 씬 추가하기

1. **"씬 추가" 버튼** 클릭
2. 씬 이름 입력 (예: "오프닝 장면")
3. 설명 입력 (선택사항)
4. **추가** 클릭

### 컷(Shot) 추가하기

각 씬 카드에서:

1. **"+ 새로운 컷 추가" 버튼** 클릭
2. 다음 설정 선택:

   | 설정 | 옵션 | 설명 |
   |------|------|------|
   | **구도** | 하이앵글, 아이레벨, 로우앵글, 더치앵글 | 카메라 각도 |
   | **사이즈** | LS, FS, KS, MS, BS, HS, HCU, OCU | 프레임 크기 |
   | **렌즈** | 24mm ~ 200mm | 초점 거리 |
   | **무빙** | 스태틱, 팬, 틸트, 돌리, 크레인, 줌, 트래킹, 핸드헬드 | 카메라 움직임 |

3. 설명 입력 (선택사항)
4. **컷 추가** 클릭

### 컷 수정하기

각 컷 카드에서:

1. **"편집" 버튼** 클릭
2. 설정 변경
3. **저장** 클릭

### 컷/씬 삭제하기

1. **"삭제" 버튼** 클릭
2. 확인 메시지에서 **삭제** 클릭

⚠️ **주의**: 삭제하면 복구할 수 없습니다!

### 스토리보드 내보내기 (JSON)

1. 스토리보드 선택
2. **"📥 내보내기" 버튼** 클릭
3. JSON 파일 자동 다운로드
4. 안전한 곳에 저장

---

## 💾 데이터 저장

### 데이터는 어디에 저장되나요?

✅ **자동 저장**: 브라우저의 localStorage에 자동 저장됨
- 페이지를 새로고침해도 데이터 유지
- 같은 Mac/브라우저에서만 보임

### 다른 Mac에서 데이터 옮기기

```
1. 스토리보드 "📥 내보내기"로 JSON 파일 저장
2. 다른 Mac에서 받은 JSON 파일 사용
   (현재는 import 기능이 없으므로 설명만 복사)
```

---

## 🔧 트러블슈팅

### Q1: "node 또는 npm이 인식되지 않습니다"

**A:** Node.js가 설치되지 않았습니다.

```bash
# Homebrew로 설치
brew install node

# 또는 https://nodejs.org/ 에서 설치
```

설치 후 터미널을 재시작하고 다시 시도하세요.

### Q2: "Permission denied" 또는 권한 오류

**A:** npm 권한 문제입니다.

```bash
# 방법 1: sudo 사용
sudo npm install

# 방법 2: npm 권한 수정 (권장)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# ~/.zshrc 또는 ~/.bash_profile에 추가 후 저장
```

### Q3: "포트 3000이 이미 사용 중입니다"

**A:** 다른 프로그램이 포트 3000을 사용 중입니다.

자동으로 3001, 3002 등 다른 포트로 실행됩니다.
- 로컬: `http://localhost:3001`
- 또는: `http://localhost:3002` 등

강제 종료하고 싶으면:
```bash
# 포트 3000을 사용하는 프로세스 찾기
lsof -i :3000

# 종료하기 (PID 번호로)
kill -9 [PID]

# 예시:
kill -9 12345
```

### Q4: "의존성 설치가 실패했습니다"

**A:** npm 캐시를 정리하고 다시 시도:

```bash
npm cache clean --force
npm install
```

### Q5: "페이지가 로드되지 않습니다"

**A:** 다음을 확인하세요:

1. 터미널에 에러 메시지가 있는지 확인
2. 정확한 주소인지 확인:
   - 로컬: `http://localhost:3000` (또는 3001, 3002)
3. 브라우저 캐시 삭제:
   - Chrome: Cmd + Shift + Delete
   - Safari: 메뉴 → 개인정보 보호 → 웹사이트 데이터 제거

### Q6: "git이 설치되지 않았습니다"

**A:** Git을 설치하세요:

```bash
# Homebrew로 설치
brew install git

# 또는 https://git-scm.com/download/mac 에서 설치
```

### Q7: "M1/M2 Mac에서 호환성 문제"

**A:** Apple Silicon Mac에서는 대부분의 경우 자동으로 호환됩니다.

문제가 있으면:
```bash
# 아키텍처 확인
uname -m

# arm64가 나오면 Apple Silicon
# x86_64가 나오면 Intel

# Node.js 재설치 (Rosetta 호환성 포함)
brew install node
```

---

## ⌨️ Mac 팁

### 터미널 단축키

| 단축키 | 기능 |
|-------|------|
| **Cmd + C** | 서버 멈추기 |
| **Cmd + K** | 터미널 화면 지우기 |
| **Cmd + N** | 새로운 터미널 윈도우 |
| **Cmd + T** | 새로운 탭 |
| **Cmd + Q** | 터미널 종료 |

### Finder에서 숨김파일 보기

```bash
Cmd + Shift + .
```

### 파일 경로 확인

```bash
# 현재 경로 보기
pwd

# 홈 디렉토리로 이동
cd ~

# 바탕화면으로 이동
cd ~/Desktop

# 이전 폴더로 돌아가기
cd ..
```

---

## 🎓 카메라 용어 설명

### 구도 (Composition)
- **하이앵글**: 위에서 내려다보는 각도 → 피사체를 약하게/작게 표현
- **아이레벨**: 눈높이의 각도 → 자연스럽고 친근하게
- **로우앵글**: 아래에서 올려다보는 각도 → 피사체를 강하게/크게 표현
- **더치앵글**: 기울어진 각도 → 긴장감이나 불안정함 표현

### 사이즈 (Shot Size)
- **LS (롱샷)**: 전체 배경 포함 → 장면 설정
- **FS (풀샷)**: 인물 전신 → 인물의 전체 모습
- **MS (미들샷)**: 허리 위 → 상반신 강조
- **BS (바스트샷)**: 가슴 위 → 상반신 클로즈업
- **HCU (헤드 클로즈업)**: 얼굴만 → 감정 표현
- **OCU (물체 클로즈업)**: 물체 접근 → 물체의 디테일

### 렌즈 (Lens)
- **24mm (광각)**: 넓은 각도 → 광활한 배경, 왜곡
- **50mm (표준)**: 자연스러운 각도 → 일반적인 촬영
- **85mm (포트레이트)**: 인물 강조 → 얼굴 촬영에 최적
- **200mm (망원)**: 좁은 각도 → 먼 피사체, 압축 효과

### 무빙 (Moving)
- **스태틱**: 움직임 없음 → 정지된 장면
- **팬**: 좌우 움직임 → 광경 보여주기
- **틸트**: 위아래 움직임 → 키 큰 피사체
- **돌리 인**: 전진 → 몰입감, 긴장감
- **돌리 아웃**: 후진 → 상황 설명, 벗어남
- **줌**: 렌즈 확대/축소 → 포인트 강조
- **트래킹**: 따라가기 → 동적인 장면
- **핸드헬드**: 손 흔들림 → 리얼리즘, 긴장감

---

## 📚 Mac 특화 팁

### 자주 사용하는 폴더 추가하기

Finder 사이드바에 폴더 추가:
1. Finder 열기
2. 드래그할 폴더로 이동
3. Cmd + Shift + L로 "즐겨찾기" 표시
4. 또는 마우스로 사이드바로 드래그

### 터미널 프로필 설정

**zsh 사용자 (기본)**
```bash
# .zshrc 수정
nano ~/.zshrc

# 또는
code ~/.zshrc
```

### Homebrew로 패키지 관리

```bash
# Homebrew 업데이트
brew update

# 설치된 패키지 확인
brew list

# 패키지 제거
brew uninstall [패키지명]
```

---

## 🚀 다음 단계

설치가 완료되면:

1. **테스트**: 샘플 스토리보드 만들어보기
2. **학습**: 각 카메라 설정의 의미 이해하기
3. **실전**: 실제 촬영 계획에 사용하기
4. **피드백**: 팀 리더에게 개선 제안 보내기

---

## 📞 도움이 필요하신가요?

문제가 생기면 팀 리더에게 다음을 알려주세요:

1. **에러 메시지 전체**
2. **어느 단계에서 문제가 발생했는지**
3. **macOS 버전** (Apple 메뉴 → 이 Mac에 관하여)
4. **Node.js 버전** (`node --version`)
5. **M1/M2 또는 Intel Mac**

---

## ⚡ 빠른 명령어 정리

```bash
# 프로젝트 다운로드 (처음 한 번만)
git clone https://github.com/[리더_이름]/storyboard-maker.git
cd storyboard-maker

# 의존성 설치 (처음 한 번만)
npm install

# 개발 서버 실행 (매번 사용할 때)
npm run dev

# 서버 종료 (필요할 때)
Cmd + C

# Node.js 설치 (필요한 경우)
brew install node

# Git 설치 (필요한 경우)
brew install git
```

---

## ✨ 주요 기능 요약

| 기능 | 설명 |
|------|------|
| 씬 관리 | 여러 씬 생성/수정/삭제 |
| 컷 관리 | 각 씬에 여러 컷 추가 |
| 카메라 설정 | 구도, 사이즈, 렌즈, 무빙 선택 |
| 자동 저장 | 데이터 자동 저장 (localStorage) |
| JSON 내보내기 | 스토리보드를 파일로 다운로드 |
| 반응형 디자인 | Mac, iPad, iPhone 모두 지원 |

---

**축하합니다! 이제 스토리보드 메이커를 사용할 준비가 완료되었습니다!** 🎉

질문이나 문제가 생기면 팀 리더에게 연락하세요.
