# 📋 맥(Mac) 팀 리더 가이드 - 팀원들에게 배포하기

이 가이드는 **Mac을 사용하는 팀 리더**가 팀원들에게 스토리보드 메이커를 배포할 때 필요한 정보입니다.

---

## 🎯 배포 옵션 선택

### 옵션 1: GitHub 사용 (권장) ⭐⭐⭐

**장점:**
- 팀원들이 쉽게 설치 가능
- 자동 업데이트 쉬움
- 버전 관리 가능
- Mac/Windows 모두 지원

**단점:**
- GitHub 계정 필요
- 인터넷 필요

---

### 옵션 2: USB/클라우드 사용 (간단)

**장점:**
- 즉시 배포 가능
- 인터넷 없이 사용 가능

**단점:**
- 업데이트 시 다시 배포해야 함
- 파일 크기가 큼

---

## 🚀 배포 방법 1: GitHub 사용

### 단계 1: 사전 준비

#### Homebrew 설치 (처음 한 번만)

터미널에서:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Git 설치

```bash
brew install git
```

#### Git 설정

```bash
git config --global user.email "당신의이메일@example.com"
git config --global user.name "당신의이름"
```

### 단계 2: GitHub 레포지토리 생성

#### 방법 A: GitHub 웹사이트에서 (권장)

1. https://github.com/new 접속
2. **Repository name**: `storyboard-maker` 입력
3. **Description**: `Web-based storyboard creator for video production` (선택)
4. **Public** 선택
5. **Create repository** 클릭

#### 방법 B: GitHub CLI 사용

먼저 GitHub CLI 설치:
```bash
brew install gh
gh auth login
```

그 다음:
```bash
gh repo create storyboard-maker --public
```

---

### 단계 3: 로컬에서 GitHub로 푸시

#### 터미널 열기

Spotlight (Cmd + Space) → "터미널" 입력

#### 프로젝트 폴더로 이동

```bash
cd /path/to/storyboard-maker
```

또는 터미널에 폴더를 드래그 앤 드롭

#### GitHub로 푸시

```bash
git branch -M main
git remote add origin https://github.com/[당신의_이름]/storyboard-maker.git
git push -u origin main
```

**예시:**
```bash
git remote add origin https://github.com/john-director/storyboard-maker.git
git push -u origin main
```

✅ 성공 시 GitHub 웹사이트에서 코드가 보입니다.

---

### 단계 4: 팀원들에게 배포

#### 이메일/Slack으로 보낼 메시지:

```
안녕하세요! 🎬

스토리보드 메이커 설치 가이드입니다.

📍 저장소: https://github.com/[당신의_이름]/storyboard-maker

🚀 설치 방법 (맥 사용자):
1. 터미널 열기 (Spotlight: Cmd + Space → "터미널")
2. 다음 명령어 실행:
   git clone https://github.com/[당신의_이름]/storyboard-maker.git
   cd storyboard-maker
   npm install
   npm run dev

3. 브라우저에서 열기:
   http://localhost:3000

4. 상세 가이드: TEAM_SETUP_GUIDE_MAC.md 읽기

질문 있으면 말씀해주세요!
```

---

## 📦 배포 방법 2: USB/클라우드 사용

### 단계 1: 배포용 폴더 준비

Finder에서:
```
storyboard-maker 폴더 우클릭
→ "정보 가져오기"
→ 다음 폴더 제외:
   - node_modules
   - .next
   - .git
```

또는 터미널에서:

```bash
cd /path/to/storyboard-maker

# 제외할 폴더 삭제 (선택사항)
rm -rf node_modules .next .git
```

### 단계 2: 압축

Finder에서:
1. `storyboard-maker` 폴더 우클릭
2. "압축" 선택
3. `storyboard-maker.zip` 생성

또는 터미널에서:

```bash
zip -r storyboard-maker.zip storyboard-maker -x "*/node_modules/*" "*/.next/*" "*/.git/*"
```

### 단계 3: 배포

- USB에 복사
- Google Drive, iCloud Drive 업로드
- Slack, 이메일로 전송

### 단계 4: 팀원에게 알리기

```
파일: storyboard-maker.zip

설치 (맥):
1. 압축 해제 (자동으로 스토리보드-메이커 폴더 생성)
2. 터미널 열기 (Cmd + Space → "터미널")
3. 다음 명령어 실행:
   cd ~/Downloads/storyboard-maker
   npm install
   npm run dev
4. http://localhost:3000 접속
```

---

## 🔄 업데이트 배포

### GitHub 사용 시 (권장):

```bash
# 코드 수정 후:
git add .
git commit -m "설명: 무엇을 수정했는지"
git push origin main

# 팀원들은 자동으로 업데이트 받을 수 있음:
git pull origin main
npm install
npm run dev
```

### USB/클라우드 사용 시:

새로운 버전을 다시 배포

---

## 👥 팀원 온보딩 체크리스트

### 개별 팀원별:

- [ ] 설치 완료 확인
- [ ] 로컬에서 실행 확인
- [ ] 페이지 로드 확인
- [ ] 샘플 스토리보드 생성 테스트
- [ ] 질문/이슈 해결

### 팀 전체:

- [ ] 모든 팀원 설치 완료
- [ ] 공동 작업 프로세스 설명
- [ ] 스토리보드 작성 규칙 정의
- [ ] 정기적인 사용 및 피드백

---

## 🎓 팀원 교육 가이드

### 1단계: 기본 사용법 (15분)

```
1. 인터페이스 소개
2. 새 스토리보드 만들기
3. 씬 추가하기
4. 컷 추가하기
5. 설정 선택 (구도, 사이즈, 렌즈, 무빙)
6. JSON 내보내기
```

### 2단계: 카메라 용어 설명 (30분)

TEAM_SETUP_GUIDE_MAC.md의 "카메라 용어 설명" 섹션 참고

### 3단계: 팀 규칙 정하기 (20분)

```
📋 명명 규칙:
- 씬 이름: "[회차]-[장소]. [상황]"
  예: "1-1. 카페 입장", "1-2. 대화 장면"

- 컷 설명: "[동작] + [감정] + [특징]"
  예: "카메라 좌→우 팬, 긴장감, 자연광 활용"

💾 데이터 관리:
- 매주 금요일 최종 버전 백업 (JSON 내보내기)
- iCloud Drive / Google Drive 공유 폴더에 저장
- 파일명: "storyboard_[날짜]_[장면명].json"

🤝 협업 방식:
- 각 팀원이 자신의 Mac에서 독립적으로 작업
- 완성된 스토리보드는 리더가 검토
- 수정사항은 이메일/Slack으로 전달
```

---

## 📊 팀 프로세스 제안

### 주간 스토리보딩 회의

```
⏱ 소요 시간: 1시간
📍 참석자: 전체 팀

시간표:
- 10분: 촬영 스케줄 확인
- 30분: 스토리보드 검토 및 피드백
- 15분: 수정사항 정리
- 5분: 다음 주 일정 확인
```

### 스토리보드 검수 체크리스트

```
□ 모든 씬이 포함되어 있는가?
□ 각 씬의 컷이 명확한가?
□ 카메라 설정이 적절한가?
□ 촬영 시간이 현실적인가?
□ 예산 내에서 가능한가?
□ 팀원들의 의견이 반영되어 있는가?
```

---

## 🆘 Mac 특화 문제 해결

### Q1: "Command not found: git"

**A:** Git이 설치되지 않았습니다.

```bash
brew install git
```

### Q2: "M1/M2 Mac에서 호환성 문제"

**A:** 대부분의 경우 자동으로 호환됩니다.

문제가 있으면:
```bash
# 아키텍처 확인
uname -m

# Node.js 재설치
brew install node
```

### Q3: "Permission denied"

**A:** npm 권한 문제입니다.

```bash
# 방법 1: sudo 사용
sudo npm install

# 방법 2: npm 권한 수정 (권장)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Q4: "이 앱이 인증되지 않았다는 경고"

**A:** Mac 보안 설정 때문입니다.

1. Apple 메뉴 → 시스템 환경설정
2. 보안 및 개인 정보 보호
3. "다시 열기" 클릭

### Q5: "Xcode 명령줄 도구 필요"

**A:** 자동으로 설치됩니다.

필요하면:
```bash
xcode-select --install
```

---

## ⌨️ 팀원에게 알려줄 Mac 팁

### 터미널 단축키

| 단축키 | 기능 |
|-------|------|
| **Cmd + C** | 서버 멈추기 |
| **Cmd + K** | 터미널 화면 지우기 |
| **Cmd + N** | 새로운 터미널 윈도우 |
| **Cmd + T** | 새로운 탭 |
| **Cmd + Q** | 터미널 종료 |
| **Cmd + Shift + .** | 숨김파일 보기 |

### Finder에서 경로 복사

```
파일 우클릭 → Option 누르기 → "경로명 복사"
```

### 터미널에 폴더 드래그

```
터미널 윈도우에 Finder의 폴더를 드래그 앤 드롭하면 경로가 입력됨
```

---

## 🚀 향후 개선 계획

### 팀원들이 요청할 만한 기능들

- [ ] **실시간 협업**: 여러 팀원이 동시에 스토리보드 수정
- [ ] **클라우드 저장**: iCloud Drive, Google Drive 연동
- [ ] **이미지 업로드**: 각 컷에 참고 이미지 첨부
- [ ] **PDF 내보내기**: 인쇄용 포맷
- [ ] **주석 기능**: 팀원들의 의견 추가
- [ ] **버전 관리**: 이전 버전 복원
- [ ] **협업자 초대**: 팀 관리 기능

### 피드백 수집하기

```
💬 피드백 양식:

1. 현재 사용하면서 불편한 점은?
2. 추가됐으면 좋은 기능은?
3. 촬영 계획 세우는 데 도움이 되었나?
4. 개선 아이디어는?

→ 수집한 피드백으로 기능 개선!
```

---

## 📞 팀 커뮤니케이션

### Slack 채널 만들기 (권장)

```
#storyboard-maker

핀: GitHub 링크 & 가이드 링크
```

### 정기 안내

```
📅 매주 월요일:
"이번 주 촬영 스케줄 확인 및 스토리보드 작성 시작"

📅 매주 금요일:
"이번 주 스토리보드 최종 버전 제출 기한"
```

---

## ⚡ 빠른 명령어 정리

```bash
# Homebrew 설치 (처음 한 번만)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Git 설치 (처음 한 번만)
brew install git

# Git 설정 (처음 한 번만)
git config --global user.email "이메일@example.com"
git config --global user.name "이름"

# GitHub에 코드 올리기
git branch -M main
git remote add origin https://github.com/당신의이름/storyboard-maker.git
git push -u origin main

# 업데이트 푸시
git add .
git commit -m "설명"
git push origin main

# 포트 확인 및 종료
lsof -i :3000
kill -9 [PID]
```

---

## ✅ 배포 체크리스트

### 배포 전:
- [ ] Homebrew 설치 확인
- [ ] Git 설치 확인
- [ ] 로컬에서 `npm run dev` 테스트
- [ ] 모든 테스트 통과 확인

### GitHub 배포 시:
- [ ] GitHub 레포지토리 생성
- [ ] 코드 푸시 완료
- [ ] Public 설정 확인
- [ ] README.md 최신 상태

### 팀원 공지 전:
- [ ] 설치 가이드 준비 완료
- [ ] Mac 특화 가이드 포함
- [ ] Q&A 준비
- [ ] 교육 자료 준비
- [ ] 팀 규칙 정의

### 배포 후:
- [ ] 팀원들에게 공지
- [ ] 개별 설치 확인
- [ ] 교육 진행
- [ ] 피드백 수집

---

## 📖 추가 리소스

- **TEAM_SETUP_GUIDE_MAC.md**: 팀원용 Mac 설치 및 사용 가이드
- **TEAM_SETUP_GUIDE.md**: Windows 사용자용 가이드
- **TEAM_LEADER_GUIDE.md**: Windows 리더용 가이드
- **README.md**: 프로젝트 개요

---

**축하합니다! 이제 Mac을 사용하는 팀원들과 함께 효율적으로 스토리보드를 작성할 수 있습니다!** 🎬🎉
