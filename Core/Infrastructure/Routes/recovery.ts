import { Router } from 'express';
import { RecoveryController } from '../Controllers/RecoveryController';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/recovery', RecoveryController.recovery);

export { router };
