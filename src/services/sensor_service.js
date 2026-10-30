import { createHash } from 'node:crypto';
import { findByApiKeyHash } from '../repositories/sensor_repository.js';
import {
  ERROR_CODES,
  UnauthorizedError,
  ForbiddenError,
} from '../errors/error.js';

const authenticateSensor = async (apiKey) => {
  if (typeof apiKey !== 'string' || !apiKey.trim()) {
    throw new UnauthorizedError(
      'API Key가 필요합니다.',
      ERROR_CODES.UNAUTHORIZED_SENSOR
    );
  }

  const apiKeyHash = createHash('sha256')
    .update(apiKey)
    .digest('hex');

  const sensorDevice = await findByApiKeyHash(apiKeyHash);

  if (!sensorDevice) {
    throw new UnauthorizedError(
      '유효하지 않은 API Key입니다.',
      ERROR_CODES.UNAUTHORIZED_SENSOR
    );
  }

  if (!sensorDevice.isEnabled) {
    throw new ForbiddenError(
      '비활성화된 센서 장치입니다.',
      ERROR_CODES.SENSOR_DISABLED
    );
  }

  return sensorDevice;
};

export { authenticateSensor };