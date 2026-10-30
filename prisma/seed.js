import { PrismaClient } from '@prisma/client';

// 각 파트의 seed 파일(prisma/seeds/<이름>_seed.js) import는 자기 파트 아래에 추가
// Building


// Congestion


// Sensor


const prisma = new PrismaClient();

// 다른 파트 테이블을 외래키로 참조하므로 Building → Congestion → Sensor 순서로 실행
// 각 seed 함수는 prisma를 인자로 받고, 여러 번 실행해도 중복되지 않게 upsert로 작성
const SEED_PARTS = [
  { part: 'Building', seeds: [] },
  { part: 'Congestion', seeds: [] },
  { part: 'Sensor', seeds: [] },
];

const runSeeds = async () => {
  for (const { part, seeds } of SEED_PARTS) {
    for (const seed of seeds) {
      await seed(prisma);
    }
    console.log(`${part} 시드 완료 (${seeds.length}개)`);
  }
};

runSeeds()
  .catch((error) => {
    console.error('시드 데이터 생성에 실패했습니다.', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
