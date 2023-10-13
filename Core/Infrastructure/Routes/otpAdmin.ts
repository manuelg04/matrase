import { Router } from 'express';
import { OtpController } from '../Controllers/OtpController';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/generate', OtpController.generate);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/validate', OtpController.validate);

export { router };
