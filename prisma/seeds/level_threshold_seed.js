// 묶음 ID는 Building 파트 elevator_groups seed와 합의한 값(1 김수환관 메인 ~ 5 다솔관 화물용)
const ELEVATOR_GROUP_IDS = [1, 2, 3, 4, 5];

// 기능명세서 M6 임시값: 1회 탑승 인원(M2)을 11명으로 가정해 도출함
// M2를 측정 위치별로 실측하면 묶음마다 다른 값으로 바꿀 예정
const TEMPORARY_MIN_PEOPLE_BY_LEVEL = [
  { levelId: 0, minPeople: 0 },
  { levelId: 1, minPeople: 6 },
  { levelId: 2, minPeople: 12 },
  { levelId: 3, minPeople: 23 },
];

export const seedLevelThresholds = async (prisma) => {
  const thresholds = ELEVATOR_GROUP_IDS.flatMap((elevatorGroupId) =>
    TEMPORARY_MIN_PEOPLE_BY_LEVEL.map(({ levelId, minPeople }) => ({
      levelId,
      elevatorGroupId,
      minPeople,
    })),
  );

  // upsert로 여러 번 실행해도 값이 중복되지 않고 최신 기준으로 맞춰지게 함
  await prisma.$transaction(
    thresholds.map(({ levelId, elevatorGroupId, minPeople }) =>
      prisma.levelThreshold.upsert({
        where: { levelId_elevatorGroupId: { levelId, elevatorGroupId } },
        update: { minPeople },
        create: { levelId, elevatorGroupId, minPeople },
      }),
    ),
  );
};
