import { Router } from 'express';
import { CrudAdminController } from '../Controllers/CrudAdminController';

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/users', CrudAdminController.create);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/users/:email', CrudAdminController.update);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.delete('/users/:email', CrudAdminController.delete);

export { router };
