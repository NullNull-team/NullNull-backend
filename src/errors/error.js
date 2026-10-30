import { failure } from '../utils/response.js';

export const ERROR_CODES = Object.freeze({
  // 400 Bad Request
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_REQUEST_BODY: 'INVALID_REQUEST_BODY',
  INVALID_MEASUREMENT: 'INVALID_MEASUREMENT',
  INVALID_WEBSOCKET_REQUEST: 'INVALID_WEBSOCKET_REQUEST',
  INVALID_DEVICE_ID: 'INVALID_DEVICE_ID',
  INVALID_ELEVATOR_GROUP_ID: 'INVALID_ELEVATOR_GROUP_ID',
  INVALID_BUILDING_ID: 'INVALID_BUILDING_ID',
  INVALID_FLOOR: 'INVALID_FLOOR',
  INVALID_LOCATION: 'INVALID_LOCATION',

  // 401 Unauthorized
  UNAUTHORIZED: 'UNAUTHORIZED',
  UNAUTHORIZED_SENSOR: 'UNAUTHORIZED_SENSOR',

  // 403 Forbidden
  FORBIDDEN: 'FORBIDDEN',
  SENSOR_DISABLED: 'SENSOR_DISABLED',
  DEVICE_ID_MISMATCH: 'DEVICE_ID_MISMATCH',

  // 404 Not Found
  NOT_FOUND: 'NOT_FOUND',
  SENSOR_NOT_FOUND: 'SENSOR_NOT_FOUND',
  ELEVATOR_GROUP_NOT_FOUND: 'ELEVATOR_GROUP_NOT_FOUND',
  BUILDING_NOT_FOUND: 'BUILDING_NOT_FOUND',
  ROOM_NOT_FOUND: 'ROOM_NOT_FOUND',
  EXIT_NOT_FOUND: 'EXIT_NOT_FOUND',

  // 409 Conflict
  CONFLICT: 'CONFLICT',
  DUPLICATE_MEASUREMENT: 'DUPLICATE_MEASUREMENT',

  // 422 Unprocessable Content
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  NO_ROUTE: 'NO_ROUTE',

  // 500 Internal Server Error
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
});

const INTERNAL_ERROR_MESSAGE = '서버 내부 오류가 발생했습니다.';

class AppError extends Error {
  constructor(message, status = 500, errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message = '잘못된 요청입니다.', errorCode = ERROR_CODES.VALIDATION_ERROR) {
    super(message, 400, errorCode);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = '인증에 실패했습니다.', errorCode = ERROR_CODES.UNAUTHORIZED) {
    super(message, 401, errorCode);
  }
}

class ForbiddenError extends AppError {
  constructor(message = '접근 권한이 없습니다.', errorCode = ERROR_CODES.FORBIDDEN) {
    super(message, 403, errorCode);
  }
}

class NotFoundError extends AppError {
  constructor(message = '리소스를 찾을 수 없습니다.', errorCode = ERROR_CODES.NOT_FOUND) {
    super(message, 404, errorCode);
  }
}

class ConflictError extends AppError {
  constructor(message = '이미 존재하는 리소스입니다.', errorCode = ERROR_CODES.CONFLICT) {
    super(message, 409, errorCode);
  }
}

class UnprocessableEntityError extends AppError {
  constructor(message = '요청을 처리할 수 없습니다.', errorCode = ERROR_CODES.UNPROCESSABLE_ENTITY) {
    super(message, 422, errorCode);
  }
}

class InternalServerError extends AppError {
  constructor(message = INTERNAL_ERROR_MESSAGE) {
    super(message, 500, ERROR_CODES.INTERNAL_SERVER_ERROR);
  }
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  // body-parser JSON 파싱 실패 -> 400
  if (err?.type === 'entity.parse.failed') {
    console.warn('[WARN]', req.method, req.originalUrl, '- invalid JSON body');
    return res
      .status(400)
      .json(failure(400, ERROR_CODES.INVALID_REQUEST_BODY, '잘못된 JSON 형식입니다.'));
  }

  // 예상 가능한 에러
  // 메세지 그대로 전달
  if (err instanceof AppError && err.status < 500) {
    console.warn('[WARN]', req.method, req.originalUrl, `- ${err.status} ${err.errorCode}: ${err.message}`);
    return res
      .status(err.status)
      .json(failure(err.status, err.errorCode, err.message));
  }

  // 500 및 예상 외 에러
  // 내부 메시지 숨기고 일반 메시지로 통일
  console.error('[ERROR]', req.method, req.originalUrl, err);

  return res
    .status(500)
    .json(failure(500, ERROR_CODES.INTERNAL_SERVER_ERROR, INTERNAL_ERROR_MESSAGE));
};

export {
  AppError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UnprocessableEntityError,
  InternalServerError,
  errorHandler,
};