# 빠른 배포 시작 (Quick Start Deployment)

## 준비 완료 상태 ✅

프로젝트는 배포할 준비가 모두 완료되었습니다:
- ✅ Next.js 16 + TypeScript 설정
- ✅ 모든 테스트 통과 (14/14 tests)
- ✅ 프로덕션 빌드 성공
- ✅ Git 레포지토리 초기화 (4개 커밋)
- ✅ Vercel 배포 설정 완료

---

## 배포 단계별 진행

### 1단계: GitHub에 코드 올리기 (5분)

#### GitHub.com 웹사이트에서:
```
1. https://github.com/new 접속
2. Repository name: storyboard-maker
3. Public 선택
4. "Create repository" 클릭
```

#### 터미널에서:
```bash
cd C:\storyboard-maker
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/storyboard-maker.git
git push -u origin main
```

**💡 팁**: GitHub 웹에서 repository를 만들면 정확한 명령어를 제시해줍니다.

---

### 2단계: Vercel에 배포 (3분)

#### 방법 1: Vercel 웹사이트 (가장 쉬움)
```
1. https://vercel.com/new 접속
2. GitHub 계정으로 로그인
3. storyboard-maker 선택
4. Framework: Next.js (자동)
5. "Deploy" 클릭
6. 완료! ✅
```

#### 방법 2: Vercel CLI
```bash
npm install -g vercel
cd C:\storyboard-maker
vercel
```

---

## 배포 후

✅ **공개 URL 획득**
- 예: `https://storyboard-maker.vercel.app`

✅ **동료들과 공유**
- URL을 전달하면 누구나 사용 가능

✅ **자동 배포**
- GitHub에 푸시하면 자동으로 업데이트됨

---

## 현재 프로젝트 정보

| 항목 | 정보 |
|------|------|
| **프레임워크** | Next.js 16 |
| **언어** | TypeScript |
| **스타일링** | Tailwind CSS |
| **테스트** | Jest (14 tests passing) |
| **데이터 저장** | Browser localStorage |
| **배포 플랫폼** | Vercel (권장) |

---

## 주요 기능

- 📺 **씬(Scene) 관리**: 여러 씬 생성/수정/삭제
- 🎬 **컷(Shot) 관리**: 각 씬에서 여러 컷 추가
- 🎥 **카메라 매개변수**:
  - 구도 (Composition): 하이앵글, 아이레벨, 로우앵글, 더치앵글
  - 사이즈 (Shot Size): LS, FS, KS, MS, BS, HS, HCU, OCU
  - 렌즈 (Lens): 24mm ~ 200mm
  - 무빙 (Moving): 스태틱, 팬, 틸트, 돌리, 크레인, 줌, 트래킹, 핸드헬드
- 💾 **JSON 내보내기**: 스토리보드를 파일로 다운로드
- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 지원

---

## 문제 해결

### 배포에 문제가 있으면:

1. **로컬 빌드 확인**
   ```bash
   cd C:\storyboard-maker
   npm run build
   ```

2. **Git 상태 확인**
   ```bash
   git status
   git log --oneline
   ```

3. **Vercel 빌드 로그 확인**
   - Vercel 대시보드 → Deployments → 빌드 실패한 배포 클릭

---

## 향후 개선 사항 (선택사항)

- 클라우드 데이터베이스 추가 (MongoDB, PostgreSQL)
- 팀 협업 기능 (실시간 동기화)
- 이미지/비디오 업로드 및 미리보기
- PDF 내보내기
- 프로젝트 공유 링크

---

## 지원

배포에 문제가 있으면 다음을 확인하세요:
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- `DEPLOYMENT.md` 파일의 자세한 가이드
