# GitHub Pages 운영 준비

SAFEKIT은 정적 HTML/CSS/JavaScript 사이트입니다. `.github/workflows/pages.yml`은 `main`에 푸시할 때 `dist/`만 GitHub Pages에 자동 배포합니다. 저장소가 `owner/repository` 형식인지 `owner/owner.github.io` 형식인지 읽어 canonical·SNS 공유 주소, PWA 경로, sitemap을 자동 설정합니다.

## 처음 한 번만 할 일

1. GitHub에서 저장소를 만들고 이 프로젝트를 `main` 브랜치에 올립니다.
2. 저장소의 **Settings → Pages → Build and deployment → Source**에서 **GitHub Actions**를 선택합니다.
3. `main`에 푸시하거나 **Actions → Deploy SAFEKIT to GitHub Pages → Run workflow**를 실행합니다.
4. Actions가 성공하면 저장소의 **Settings → Pages**에서 사이트 주소를 확인합니다. 이후 `main`에 푸시할 때마다 자동 배포됩니다.

저장소 이름이 `<사용자명>.github.io`면 `https://<사용자명>.github.io/`, 그 외에는 `https://<사용자명>.github.io/<저장소명>/` 형태입니다. 본인 도메인을 쓸 경우 저장소 변수 `PAGES_BASE_URL`에 `https://도메인/`을 설정하세요.

## 공개 범위와 알림 기능

GitHub Pages는 공개 웹호스팅입니다. 배포된 웹사이트는 누구나 접속할 수 있으며, 공개 저장소라면 소스도 공개됩니다. GitHub Pages의 공개 범위와 요금 조건은 계정·저장소 요금제에 따라 달라질 수 있으므로 GitHub 설정을 확인하세요. 실제 운영자 개인 자료나 비밀 키를 저장소에 올리지 마세요.

GitHub Pages만으로는 서버 비밀값, 회원가입 데이터, 뉴스 수집, 실제 이메일·백그라운드 웹 푸시 발송을 처리할 수 없습니다. 현재 알림 UI는 시연용입니다. 이 기능을 출시하려면 별도 서버리스 백엔드·DB·뉴스 공급원·메일 발신 서비스를 연결해야 합니다. 자세한 준비 항목은 `ALERT-INTEGRATION.md`를 참고하세요.

## 로컬 배포 주소 계산 확인

배포 스크립트는 GitHub Actions가 주는 `GITHUB_REPOSITORY`를 사용합니다. 예를 들면 `myname/safekit`은 프로젝트 사이트 경로 `/safekit/`, `myname/myname.github.io`는 사용자 사이트 경로 `/`로 설정됩니다.
