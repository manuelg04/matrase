import { Router } from 'express';
import { AuthAdminController } from '../Controllers/AuthAdminController';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/adminLogin', AuthAdminController.login);

export { router };
