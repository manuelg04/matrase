import { Router } from 'express';
import { AuthController } from '../Controllers/AuthController';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/login', AuthController.login);

export { router };
