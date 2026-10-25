import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'NULLNULL backend server is running',
  });
});

app.get('/buildings', (req, res) => {
  res.status(200).json({
    result: 'Success',
    status: 200,
    success: {
      total_count: 3,
      buildings: [
        { building_id: 1, building_name: '김수환관' },
        { building_id: 2, building_name: '마리아관' },
        { building_id: 3, building_name: '다솔관' }
      ]
    },
    error: null
  });
});

app.listen(PORT, () => {
  console.log(`NULLNULL server running on port ${PORT}`);
});