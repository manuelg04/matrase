/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { ChatController } from '../Controllers/ChatController';
import Container from 'typedi';
const router = Router();

// Crear una nueva instancia de ChatController
const chatController: ChatController = Container.get(ChatController);

// Ruta para crear un nuevo chat
router.post('/Createchat', async (req, res) => {
  await chatController.createChat(req, res);
});

// Ruta para obtener los detalles de un chat por su ID
router.get('/getChatDetails/:id', async (req, res) => {
  await chatController.getChatDetails(req, res);
});

// Ruta para enviar un mensaje al chat
router.post('/sendMessage/:id', async (req, res) => {
  await chatController.sendChatMessage(req, res);
});

// Ruta para obtener todos los mensajes de un chat
router.get('/getMessagesByChatId/:id', async (req, res) => {
  await chatController.getMessagesByChatId(req, res);
});

router.post('/getChatsForAdmin', async (req, res) => {
  await chatController.getChatsForAdmin(req, res);
});

export { router };
