// measurements.estimated_people가 Decimal(6,1)이라 저장값과 같은 소수 첫째 자리로 맞춤
const ESTIMATED_PEOPLE_DECIMALS = 1;

// 기능명세서 D102: 한 사람이 여러 기기를 가지고 다녀서 기기 수를 보정계수로 나눠 인원을 추정함
const calculateEstimatedPeople = ({ deviceCount, correctionFactor }) => {
  if (!Number.isInteger(deviceCount) || deviceCount < 0) {
    throw new Error(`기기 수는 0 이상의 정수여야 합니다. (deviceCount: ${deviceCount})`);
  }

  if (!(correctionFactor > 0)) {
    throw new Error(`보정계수는 0보다 커야 합니다. (correctionFactor: ${correctionFactor})`);
  }

  const scale = 10 ** ESTIMATED_PEOPLE_DECIMALS;

  return Math.round((deviceCount / correctionFactor) * scale) / scale;
};

// 화면에 보이는 인원과 단계가 어긋나지 않도록 반올림된 추정 인원으로 판정함
// 경계값은 묶음마다 다르므로 level_thresholds에서 읽은 값을 그대로 받음
const determineLevelId = ({ estimatedPeople, thresholds }) => {
  const reachedLevelIds = thresholds
    .filter(({ minPeople }) => estimatedPeople >= minPeople)
    .map(({ levelId }) => levelId);

  // 널널 단계의 min_people이 0이라 정상 데이터라면 항상 한 단계 이상 걸림
  if (reachedLevelIds.length === 0) {
    throw new Error(`추정 인원 ${estimatedPeople}명에 해당하는 혼잡 단계 경계값이 없습니다.`);
  }

  return Math.max(...reachedLevelIds);
};

export { calculateEstimatedPeople, determineLevelId };
