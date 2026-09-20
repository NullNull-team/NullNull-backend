# 널널 (NULLNULL) — 백엔드

> 붐비는 곳을 피해 여유 있는 공간을 찾아주는 캠퍼스 혼잡도 서비스

## 서비스 개요

수업 종료 직후 엘리베이터와 주요 동선에 인원이 집중된다.
학생은 얼마나 붐비는지 미리 알 수 없고, 학교는 동선 혼잡에 대한 데이터를 가지고 있지 않다.

BLE 광고 패킷을 수신해 지점별 밀집도를 측정하고, 혼잡 단계로 환산해 시각화한다.
학생은 붐비는 곳을 피할 수 있고, 누적 데이터는 캠퍼스 동선 개선의 근거가 된다.

## 관련 저장소

| 저장소 | 내용 |
|---|---|
| [nullnull-frontend](https://github.com/NullNull-team/nullnull-frontend) | 프론트엔드 |

## 문서

기획 문서와 회의록은 Notion 에서 관리한다.

| 문서 | 링크 |
|---|---|
| 프로젝트 메인 | [바로가기](https://app.notion.com/p/3db0379161a0805db549f231b1fe42ac) |
| 기능명세서 | [바로가기](https://app.notion.com/p/2f50379161a083b0bc0b81c20a74ba7c) |
| API 명세서 | [바로가기](https://app.notion.com/p/API-3dc0379161a080f4af45f0a0453a8ba4) |
| ERD 설계 | [바로가기](https://app.notion.com/p/ERD-3dc0379161a080229f78d328034999b2) |
| Git 컨벤션 | [바로가기](https://app.notion.com/p/Git-3dc0379161a080568d19e387939576b4) |
| 코드 컨벤션 | [바로가기](https://app.notion.com/p/3dc0379161a080119faff71d85ef3930) |
| 환경 변수 | [바로가기](https://app.notion.com/p/env-3dc0379161a08028bdf1d6dcad2e2ccb) |

## 기술 스택

| 항목 | 내용 |
|---|---|
| 언어 · 프레임워크 | 미정 |
| 데이터베이스 | 미정 |
| 배포 | 미정 |
| 센싱 | BLE 스캔 (Raspberry Pi) |

## 시작하기

```bash
git clone https://github.com/NullNull-team/nullnull-backend.git
cd nullnull-backend
# 스택 확정 후 작성
```

## 환경 변수

`.env.example` 을 복사해 `.env` 로 사용한다. `.env` 는 절대 커밋하지 않는다.

```bash
cp .env.example .env
```

값은 Notion 의 [환경 변수](https://app.notion.com/p/env-3dc0379161a08028bdf1d6dcad2e2ccb) 문서를 참고한다.

## 담당 기능

| 기능 | 순위 | 상태 |
|---|---|---|
| 혼잡도 조회 API | 1 | 예정 |
| 여유 지점 추천 API | 1 | 예정 |
| BLE 스캔 값 수신 | 1 | 예정 |
| 혼잡 단계 환산 | 1 | 예정 |
| 측정값 재생 (시연 대비) | 2 | 예정 |
| 장치 상태 감지 | 3 | 예정 |
| 시설팀 리포트 | 4 | 예정 |

상세 정의는 [기능명세서](https://app.notion.com/p/2f50379161a083b0bc0b81c20a74ba7c),
엔드포인트는 [API 명세서](https://app.notion.com/p/API-3dc0379161a080f4af45f0a0453a8ba4)를 따른다.

## 데이터 수집 원칙

**설계 초기부터 지킨다. 나중에 지우는 방식으로 우회하지 않는다.**

- MAC 주소 등 기기 식별자를 저장하지 않는다
- 스캔 장치에서 집계한 개수만 서버로 전송한다
- 수집 원본 데이터는 `data/raw/` 에 두고 커밋하지 않는다
- 보정 계수와 혼잡 단계 임계값은 실측으로 결정한다

## 작업 규칙

| 브랜치 | 용도 |
|---|---|
| `main` | 배포 가능한 상태만. 직접 푸시 금지 |
| `develop` | 통합 브랜치 |
| `feat/*` | 기능 개발 |
| `fix/*` | 버그 수정 |

```bash
git checkout develop
git pull origin develop
git checkout -b feat/기능이름
```

작업 후 `develop` 으로 PR 을 보내고 리뷰어 1명 이상 승인을 받는다.
상세 규칙은 [Git 컨벤션](https://app.notion.com/p/Git-3dc0379161a080568d19e387939576b4)을 따른다.

## API 변경 시

프론트와 백엔드가 저장소로 나뉘어 있어 변경 사항이 자동으로 공유되지 않는다.

1. [API 명세서](https://app.notion.com/p/API-3dc0379161a080f4af45f0a0453a8ba4)를 먼저 수정한다
2. 팀 채널에 변경 내용을 공유한다
3. 프론트 담당자의 확인을 받은 뒤 배포한다

## 팀

| 이름 | GitHub |
|---|---|
| | |
| | |
| | |
