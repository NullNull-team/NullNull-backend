# 널널 (NULLNULL) — 백엔드

> 붐비는 곳을 피해 여유 있는 공간을 찾아주는 캠퍼스 혼잡도 서비스

| 저장소 | 내용 |
|---|---|
| [nullnull-docs](../../../nullnull-docs) | 기획 문서, 회의록, 협업 규칙 |
| [nullnull-frontend](../../../nullnull-frontend) | 프론트엔드 |

## 기술 스택

| 항목 | 내용 |
|---|---|
| 언어 · 프레임워크 | 미정 |
| 데이터베이스 | 미정 |
| 배포 | 미정 |
| 센싱 | BLE 스캔 (Raspberry Pi) |

## 시작하기

```bash
git clone <저장소 주소>
cd nullnull-backend
# 스택 확정 후 작성
```

## 환경 변수

`.env.example` 을 복사해 `.env` 로 사용한다.

```bash
cp .env.example .env
```

`.env` 는 절대 커밋하지 않는다.

## 담당 기능

| ID | 기능 | 상태 |
|---|---|---|
| F-01 | 혼잡도 조회 API | 예정 |
| F-02 | 여유 지점 추천 API | 예정 |
| F-03 | 혼잡도 데이터 수집 | 예정 |

상세 정의는 [기능명세서](../../../nullnull-docs/blob/main/기능명세서.md),
엔드포인트는 [API명세서](../../../nullnull-docs/blob/main/API명세서.md)를 참고한다.

## 데이터 수집 원칙

- MAC 주소 등 기기 식별자를 저장하지 않는다
- 스캔 장치에서 집계한 개수만 서버로 전송한다
- 수집 원본 데이터는 `data/raw/` 에 두고 커밋하지 않는다

## 작업 규칙

브랜치 전략과 커밋 컨벤션은 [협업규칙](../../../nullnull-docs/blob/main/협업규칙.md)을 따른다.

```bash
git checkout develop
git pull origin develop
git checkout -b feat/기능이름
```

## 팀

| 이름 | GitHub |
|---|---|
| | |
| | |
| | |
