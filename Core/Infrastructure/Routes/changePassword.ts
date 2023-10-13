import { Router } from 'express';
import { ChangePasswordController } from '../Controllers/ChangePasswordController';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/changePassword', ChangePasswordController.changePassword);

export { router };
