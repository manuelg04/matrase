/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { NoveltyController } from '../Controllers/NoveltyController';
import Container from 'typedi';
const router = Router();

// Crear una nueva instancia de NoveltyController
const noveltyController: NoveltyController = Container.get(NoveltyController);

// Ruta para crear una nueva novedad

router.post('/createNovelty', async (req, res) => {
  await noveltyController.createNovelty(req, res);
});

export { router };
