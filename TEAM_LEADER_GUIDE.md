# 📋 팀 리더 가이드 - 팀원들에게 배포하기

이 가이드는 **팀 리더(당신)**가 팀원들에게 스토리보드 메이커를 배포할 때 필요한 정보입니다.

---

## 🎯 배포 옵션 선택

### 옵션 1: GitHub 사용 (권장) ⭐⭐⭐

**장점:**
- 팀원들이 쉽게 설치 가능
- 자동 업데이트 쉬움
- 버전 관리 가능
- 시간 경과에 따른 변경 추적 가능

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
- 파일 크기가 큼 (의존성 포함 시 ~500MB)

---

## 🚀 배포 방법 1: GitHub 사용

### 단계 1: GitHub 레포지토리 생성

#### A. GitHub 웹사이트에서:

1. https://github.com/new 접속
2. **Repository name**: `storyboard-maker` 입력
3. **Description**: `Web-based storyboard creator for video production` (선택)
4. **Public** 선택 (팀원들이 볼 수 있게)
5. **Create repository** 클릭

#### B. 또는 GitHub CLI 사용:

```bash
gh repo create storyboard-maker --public
```

---

### 단계 2: 로컬에서 GitHub로 푸시

```bash
cd C:\storyboard-maker
git branch -M main
git remote add origin https://github.com/[당신의_이름]/storyboard-maker.git
git push -u origin main
```

**예시:**
```bash
git remote add origin https://github.com/john-director/storyboard-maker.git
```

---

### 단계 3: 팀원들에게 배포

#### 이메일/Slack으로 보낼 메시지:

```
안녕하세요! 🎬

스토리보드 메이커 설치 가이드입니다.

📍 저장소: https://github.com/[당신의_이름]/storyboard-maker

🚀 설치 방법:
1. 터미널에서 다음 명령어 실행:
   git clone https://github.com/[당신의_이름]/storyboard-maker.git
   cd storyboard-maker
   npm install
   npm run dev

2. 브라우저에서 열기:
   http://localhost:3000

3. 상세 가이드: 프로젝트 폴더의 TEAM_SETUP_GUIDE.md 읽기

질문 있으면 말씀해주세요!
```

---

## 📦 배포 방법 2: USB/클라우드 사용

### 단계 1: 배포용 폴더 준비

```bash
cd C:\storyboard-maker

# node_modules와 .next 폴더 제외하고 배포
# (팀원들이 npm install해서 다운받을 것)
```

**배포할 파일들:**
```
storyboard-maker/
├── app/
├── components/
├── lib/
├── types/
├── package.json
├── package-lock.json
├── README.md
├── TEAM_SETUP_GUIDE.md
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── jest.config.js
├── vercel.json
└── ...
```

**제외할 폴더:**
```
node_modules/      (팀원들이 다시 설치)
.next/            (빌드 결과물)
.git/             (Git 제외)
```

### 단계 2: 압축

```bash
# PowerShell에서:
Compress-Archive -Path "C:\storyboard-maker" -DestinationPath "storyboard-maker.zip"
```

또는 Windows 탐색기에서 마우스 우클릭 → 압축

### 단계 3: 배포

- USB에 복사
- Google Drive, OneDrive, Dropbox 업로드
- Slack, 이메일로 전송

### 단계 4: 팀원에게 알리기

```
파일: storyboard-maker.zip

설치:
1. 압축 해제
2. PowerShell/CMD 열기
3. 다음 명령어 실행:
   cd storyboard-maker
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

**TEAM_SETUP_GUIDE.md**의 "카메라 용어 설명" 섹션 참고

각 카테고리별로:
- 정의
- 언제 사용하는가
- 예시 장면

### 3단계: 팀 규칙 정하기 (20분)

```
예시:

📋 명명 규칙:
- 씬 이름: "[회차]-[장소]. [상황]"
  예: "1-1. 카페 입장", "1-2. 대화 장면"

- 컷 설명: "[동작] + [감정] + [특징]"
  예: "카메라 좌→우 팬, 긴장감, 자연광 활용"

💾 데이터 관리:
- 매주 금요일 최종 버전 백업 (JSON 내보내기)
- Google Drive 공유 폴더에 저장
- 파일명: "storyboard_[날짜]_[장면명].json"

🤝 협업 방식:
- 각 팀원이 자신의 PC에서 독립적으로 작업
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

## 🆘 문제 해결

### 팀원이 설치를 못했을 때

**확인 사항:**
1. Node.js가 설치되어 있는가?
   ```bash
   node --version
   npm --version
   ```

2. 올바른 폴더에서 명령어를 실행했는가?
   ```bash
   # 현재 폴더 확인
   pwd (또는 cd 만 입력)
   ```

3. 인터넷 연결이 정상인가?
   ```bash
   npm install --verbose
   ```

### 팀원이 다른 데이터를 보는 경우

이것은 **정상입니다!** 각자 브라우저에 저장되므로 다른 데이터입니다.

해결책:
- JSON 파일로 내보내서 팀원들과 공유
- 회의에서 한 PC에서 화면 공유하며 검토
- 향후 클라우드 데이터베이스 추가 예정

---

## 🚀 향후 개선 계획

### 팀원들이 요청할 만한 기능들

- [ ] **실시간 협업**: 여러 팀원이 동시에 스토리보드 수정
- [ ] **클라우드 저장**: Google Drive, Dropbox 연동
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

핀: 이 가이드 링크
```

### 정기 안내

```
📅 매주 월요일:
"이번 주 촬영 스케줄 확인 및 스토리보드 작성 시작"

📅 매주 금요일:
"이번 주 스토리보드 최종 버전 제출 기한"
```

---

## ✅ 배포 체크리스트

### 배포 전:
- [ ] 로컬에서 `npm run dev` 테스트
- [ ] 모든 테스트 통과 확인
- [ ] Git 커밋 정상 작동
- [ ] TEAM_SETUP_GUIDE.md 검토

### GitHub 배포 시:
- [ ] GitHub 레포지토리 생성
- [ ] 코드 푸시 완료
- [ ] Public 설정 확인
- [ ] README.md 최신 상태

### 팀원 공지 전:
- [ ] 설치 가이드 준비 완료
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

- **TEAM_SETUP_GUIDE.md**: 팀원용 설치 및 사용 가이드
- **README.md**: 프로젝트 개요
- **DEPLOYMENT.md**: 배포 상세 정보

---

**축하합니다! 이제 팀원들과 함께 효율적으로 스토리보드를 작성할 수 있습니다!** 🎬🎉
