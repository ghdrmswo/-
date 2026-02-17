# 배포 가이드 (Deployment Guide)

## 1단계: GitHub 레포지토리 생성

### A. GitHub 웹사이트에서
1. https://github.com/new 로 이동
2. Repository name: `storyboard-maker`
3. Description (선택): `Web-based storyboard creation tool for video production`
4. Public 선택
5. Create repository 클릭

### B. 또는 GitHub CLI 사용 (설치되어 있는 경우)
```bash
gh repo create storyboard-maker --public --source=. --remote=origin --push
```

---

## 2단계: 로컬에서 GitHub로 Push

레포지토리를 생성한 후, 다음 명령어를 실행하세요 (GitHub에서 제공하는 명령어와 동일):

```bash
cd C:\storyboard-maker
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/storyboard-maker.git
git push -u origin main
```

**참고**: `YOUR_USERNAME`을 자신의 GitHub 사용자명으로 변경하세요.

---

## 3단계: Vercel 배포

### 가장 간단한 방법 (권장):

1. https://vercel.com/new 로 이동
2. GitHub 계정으로 로그인
3. "Import Git Repository" 클릭
4. `storyboard-maker` 레포지토리 선택
5. Project name: `storyboard-maker` (기본값 유지)
6. Framework: `Next.js` (자동 감지됨)
7. "Deploy" 클릭

### 또는 Vercel CLI 사용:

```bash
npm install -g vercel
cd C:\storyboard-maker
vercel
```

---

## 배포 후

배포가 완료되면:
- 공개 URL 획득 (예: `https://storyboard-maker-xyz.vercel.app`)
- 이 URL을 동료들과 공유 가능
- 자동 배포: GitHub에 push할 때마다 자동으로 업데이트됨

---

## 데이터 저장소

현재 앱은 **브라우저 localStorage**를 사용합니다:
- 각 사용자의 브라우저에 데이터가 저장됨
- 같은 컴퓨터/브라우저에서는 데이터가 유지됨
- 다른 컴퓨터에서는 JSON export/import 기능으로 데이터 공유 가능

향후 서버 데이터베이스 추가 가능:
- MongoDB, PostgreSQL, Firebase 등 연동 가능
- 팀 간 실시간 협업 기능 추가 가능

---

## 문제 해결

### 배포 실패 시
- 로컬에서 빌드 성공 확인: `npm run build`
- Git 커밋 상태 확인: `git status`
- Vercel 빌드 로그 확인 (Vercel 대시보드)

### 환경 변수 필요 시
- 현재는 불필요하지만, 향후 추가 가능
- `.env.example` 파일 참고

---

## 다음 단계

배포 후 개선 아이디어:
- [ ] 팀 협업 기능 (실시간 동기화)
- [ ] 클라우드 저장소 (Google Drive, Dropbox 연동)
- [ ] 이미지/비디오 미리보기 기능
- [ ] 스토리보드 공유 링크
- [ ] PDF 내보내기
- [ ] 협업자 초대 및 권한 관리
