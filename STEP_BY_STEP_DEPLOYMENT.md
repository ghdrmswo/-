# 단계별 배포 가이드 (Step-by-Step)

## 🎯 목표
로컬 프로젝트를 웹에 배포하여 URL을 통해 누구나 접근 가능하게 만들기

---

## 📋 사전 준비

필요한 것:
- [ ] GitHub 계정 (없으면 [여기](https://github.com/signup)서 생성)
- [ ] Vercel 계정 (없으면 [여기](https://vercel.com)서 생성)

---

## 🚀 배포 단계

### STEP 1: GitHub에 코드 올리기 (약 5분)

#### 1-1) GitHub에 새 레포지토리 생성

웹브라우저에서:
1. https://github.com/new 접속
2. **Repository name**: `storyboard-maker` 입력
3. **Description** (선택사항): `Web-based storyboard creator for video production` 입력
4. **Public** 선택 (누구나 볼 수 있게)
5. ✅ **Create repository** 클릭

📸 생성 후 다음과 같은 화면이 나옵니다:
```
…or push an existing repository from the command line

git remote add origin https://github.com/YOUR_USERNAME/storyboard-maker.git
git branch -M main
git push -u origin main
```

#### 1-2) 터미널에서 GitHub로 푸시

**Windows PowerShell 또는 CMD에서:**

```bash
cd C:\storyboard-maker
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/storyboard-maker.git
git push -u origin main
```

💡 **YOUR_USERNAME**을 자신의 GitHub 사용자명으로 변경하세요.

예시:
```bash
git remote add origin https://github.com/john-doe/storyboard-maker.git
```

✅ 성공하면:
```
Enumerating objects: 28, done.
Counting objects: 100% (28/28), done.
...
To https://github.com/YOUR_USERNAME/storyboard-maker.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

### STEP 2: Vercel에 배포하기 (약 3분)

#### 2-1) Vercel 웹사이트에서 배포 (권장)

웹브라우저에서:

1. https://vercel.com/new 접속
2. GitHub 계정으로 로그인 (처음이면 "Sign up with GitHub" 클릭)
3. **Import Git Repository** 섹션에서 `storyboard-maker` 검색 및 선택
4. 설정 페이지:
   - **Project Name**: `storyboard-maker` (자동으로 입력됨)
   - **Framework**: `Next.js` (자동으로 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Environment Variables**: 필요 없음 (비움)
5. ✅ **Deploy** 버튼 클릭

📊 배포 진행 상황을 실시간으로 볼 수 있습니다:
```
✓ Build completed
✓ Deployment complete
✓ Ready to visit
```

#### 2-2) Vercel CLI를 사용한 배포 (대안)

```bash
# Vercel CLI 설치
npm install -g vercel

# 터미널에서 프로젝트 디렉토리로 이동
cd C:\storyboard-maker

# 배포 시작
vercel
```

대화식으로 진행됩니다:
```
? Set up and deploy "C:\storyboard-maker"? [Y/n]
? Which scope should contain your project? [Your Account]
? Link to existing project? [y/N]
? What's your project's name? storyboard-maker
? In which directory is your code? ./
...
✓ Production: https://storyboard-maker-xyz.vercel.app
```

---

## ✅ 배포 후 확인

### STEP 3: 배포 완료 확인

1. **Vercel 대시보드에서 URL 확인**
   - https://vercel.com/dashboard
   - `storyboard-maker` 프로젝트 클릭
   - **Production URL** 복사 (예: `https://storyboard-maker-xyz.vercel.app`)

2. **웹브라우저에서 접속**
   - 위 URL을 브라우저에 입력
   - 🎬 **스토리보드 메이커** 페이지가 로드되는지 확인

3. **기능 테스트**
   ```
   ✓ "새 스토리보드" 버튼 클릭
   ✓ 스토리보드 이름 입력
   ✓ "씬 추가" 버튼으로 씬 생성
   ✓ "+ 새로운 컷 추가" 버튼으로 컷 추가
   ✓ 구도, 사이즈, 렌즈, 무빙 선택
   ✓ "📥 내보내기" 버튼으로 JSON 다운로드
   ```

4. **데이터 저장 확인**
   ```
   ✓ 스토리보드 생성
   ✓ 페이지 새로고침 (Ctrl+R)
   ✓ 데이터가 남아있는지 확인 (localStorage에 저장됨)
   ```

---

## 🎉 배포 완료!

### URL 공유하기

배포된 URL을 팀원들과 공유하세요:
```
https://storyboard-maker-xyz.vercel.app
```

다른 사람들이 이 URL에 접속하면:
- ✅ 자신의 스토리보드 생성 가능
- ✅ 자신의 브라우저에 데이터 저장됨
- ✅ 로그인 없이 사용 가능

---

## 🔄 향후 업데이트 방법

코드를 수정하고 배포하고 싶으면:

```bash
# 1. 로컬에서 코드 수정
# (예: app/page.tsx 등 수정)

# 2. Git에 커밋
git add .
git commit -m "설명: 어떤 기능을 추가/수정했는지"

# 3. GitHub에 푸시
git push

# 4. Vercel이 자동으로 배포! (2-3분 소요)
```

Vercel은 GitHub에 푸시될 때마다 **자동으로 배포**됩니다.

---

## 📊 배포 정보 확인

### GitHub에서 확인
- https://github.com/YOUR_USERNAME/storyboard-maker
- 모든 커밋과 코드 이력이 보입니다

### Vercel에서 확인
- https://vercel.com/dashboard
- 배포 이력, 성능, 환경 변수 등 관리 가능

---

## ⚠️ 주의사항

### 데이터 저장 방식
현재는 **각 사용자의 브라우저에 localStorage로 저장**됩니다:
- 장점: 간단, 빠름, 비용 없음
- 단점: 브라우저 캐시 삭제 시 데이터 손실

### 정기적 백업
```
1. 스토리보드 생성
2. "📥 내보내기" 버튼으로 JSON 다운로드
3. 안전한 곳에 저장
```

### 공동 작업
현재는 파일 기반 공유:
```
1. 팀 리더가 스토리보드 생성
2. JSON으로 내보내기
3. 팀원들에게 파일 전달
4. 팀원들이 해당 파일 불러오기 (JSON import 기능 추가 필요)
```

---

## 🆘 문제 해결

### Q: 배포에 실패했어요
A: Vercel 대시보드의 **Deployments** 탭에서 빌드 로그를 확인하세요.

### Q: 웹사이트가 느려요
A: Vercel의 성능 분석 도구로 확인 가능. 현재는 localhost와 거의 같은 속도여야 합니다.

### Q: 다른 사람이 내 데이터를 볼 수 있나요?
A: 아니요. 각자 브라우저에만 저장되므로 완전히 독립적입니다.

### Q: 팀 전체가 같은 스토리보드를 수정하고 싶어요
A: 현재는 JSON 파일 공유로 가능. 향후 실시간 협업 기능 추가 가능.

---

## 📞 다음 단계

배포 후 필요에 따라:

1. **기능 추가**
   - PDF 내보내기
   - 이미지 업로드
   - 클라우드 저장소

2. **팀 협업**
   - 데이터베이스 추가 (MongoDB, Firebase)
   - 실시간 동기화
   - 사용자 계정 시스템

3. **성능 최적화**
   - 이미지 최적화
   - 캐싱 전략
   - CDN 설정

---

**축하합니다! 🎉 이제 당신의 스토리보드 메이커가 전 세계에 공개되었습니다!**
