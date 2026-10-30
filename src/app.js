import 'dotenv/config';
import express from 'express';
import { success } from './utils/response.js';
import { errorHandler, NotFoundError } from './errors/error.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json(
    success(200, {
      status: 'OK',
      message: 'NULLNULL backend server is running',
    })
  );
});

app.get('/buildings', (req, res) => {
  res.status(200).json({
    result: 'Success',
    status: 200,
    success: {
      buildings: [
        {
          building_id: 1,
          building_name: '김수환관',
          service_status: 'MEASURING'
        },
        {
          building_id: 2,
          building_name: '마리아관',
          service_status: 'MEASURING'
        },
        {
          building_id: 3,
          building_name: '다솔관',
          service_status: 'MEASURING'
        }
      ]
    },
    error: null
  });
});

// 모든 API 라우터는 반드시 이 404 에러 처리 미들웨어 위에 등록해야 합니다.
// 등록되지 않은 경로
app.use((req, res, next) => {
  next(new NotFoundError('존재하지 않는 경로입니다.'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`NULLNULL server running on port ${PORT}`);
});