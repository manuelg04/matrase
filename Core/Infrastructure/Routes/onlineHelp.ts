/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { HelpOnlineController } from '../Controllers/HelpOnlineController';
import Container from 'typedi';
const router = Router();

// Crear una nueva instancia de HelpOnlineController
const helpOnlineController: HelpOnlineController =
  Container.get(HelpOnlineController);

// Ruta para crear una nueva solicitud de ayuda en línea
router.post('/helpOnline', async (req, res) => {
  await helpOnlineController.createHelpOnline(req, res);
});

// Ruta para obtener detalles de una solicitud de ayuda en línea
// router.get('/getHelpOnlineDetails/:id', async (req, res) => {
//   await helpOnlineController.getHelpOnlineDetails(req, res);
// });

// // Ruta para listar todas las solicitudes de ayuda en línea
// router.get('/listHelpOnline', async (req, res) => {
//   await helpOnlineController.listHelpOnline(req, res);
// });

export { router };
