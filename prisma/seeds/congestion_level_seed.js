// 기능명세서 D102·B105 기준. id는 0~3, 클수록 붐빔
const CONGESTION_LEVELS = [
  { id: 0, name: '널널', sendCars: 0 },
  { id: 1, name: '쏘쏘', sendCars: 0 },
  { id: 2, name: '답답', sendCars: 1 },
  { id: 3, name: '빡빡', sendCars: 2 },
];

export const seedCongestionLevels = async (prisma) => {
  // upsert로 여러 번 실행해도 값이 중복되지 않고 최신 기준으로 맞춰지게 함
  await prisma.$transaction(
    CONGESTION_LEVELS.map(({ id, name, sendCars }) =>
      prisma.congestionLevel.upsert({
        where: { id },
        update: { name, sendCars },
        create: { id, name, sendCars },
      }),
    ),
  );
};
