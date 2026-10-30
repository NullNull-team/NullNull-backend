import { Router } from 'express';
import { sensorAuth } from '../middlewares/sensor_auth.js';

const router = Router();

router.post('/measurements', sensorAuth, (req, res) => {
  return res.status(200).json({
    message: '센서 인증에 성공했습니다.',
    sensorDevice: req.sensorDevice,
  });
});

export default router;