# SAFEKIT

재난 상황별 행동요령과 비상 준비를 돕는 정적 웹사이트입니다.

## 배포

이 저장소는 `.github/workflows/pages.yml`을 사용해 `dist/`의 웹사이트를 GitHub Pages에 배포합니다. GitHub 저장소에서 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정하세요. 이후 `main` 브랜치에 변경을 올리면 자동 배포됩니다.

## 기능 상태

- 재난별 상황 안내, 설문형 행동 체크, 준비물 목록을 제공합니다.
- 뉴스 키워드 알림, 이메일, 백그라운드 웹 푸시는 현재 시연 기능입니다. 실제 발송에는 별도 서버리스 백엔드와 데이터베이스, 뉴스 공급원, 메일 발신 서비스가 필요합니다.
- 상품 링크는 쿠팡으로 연결됩니다. 쿠팡 파트너스 링크를 통한 구매가 발생하면 운영자가 수수료를 받을 수 있습니다.
- SAFEKIT은 정부 긴급 경보·구조 요청을 대체하지 않습니다. 급박한 상황에서는 119와 관계 기관 지시를 따르세요.

## 배포 경로

프로젝트 저장소는 `https://<사용자명>.github.io/<저장소명>/` 형태로 게시됩니다. 사용자 사이트 저장소(`<사용자명>.github.io`)는 `/` 경로를 사용합니다. workflow가 저장소 종류에 맞춰 사이트 경로를 자동 구성합니다.

자세한 설정과 운영 제한은 [README-GITHUB-PAGES.md](README-GITHUB-PAGES.md) 및 [ALERT-INTEGRATION.md](ALERT-INTEGRATION.md)를 참고하세요.
