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

app.listen(PORT, () => {
  console.log(`NULLNULL server running on port ${PORT}`);
});