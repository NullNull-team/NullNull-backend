import { authenticateSensor } from '../services/sensor_service.js';

const sensorAuth = async (req, res, next) => {
  try {
    const apiKey = req.get('X-API-Key');

    const sensorDevice = await authenticateSensor(apiKey);

    req.sensorDevice = sensorDevice;

    next();
  } catch (error) {
    next(error);
  }
};

export { sensorAuth };