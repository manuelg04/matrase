/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable n/handle-callback-err */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Service, Container } from 'typedi';
import { type Server, type Socket } from 'socket.io';
import { MessageRepository } from '../Repositories/MessageRepository';
import fs from 'fs';

@Service()
export class ChatSocketController {
  private io: Server;
  private readonly messageRepo: MessageRepository;

  constructor() {
    this.messageRepo = Container.get<MessageRepository>(MessageRepository);
  }

  public initializeSocket(server: Server): void {
    this.io = server;
    this.io.on('connection', (socket: Socket) => {
      this.handleConnection(socket);
    });
  }

  private handleConnection(socket: Socket): void {
    socket.on('join_chat', (chatId) => {
      socket.join(`chat_${chatId}`);
    });

    socket.on('leave_chat', (chatId) => {
      socket.leave(`chat_${chatId}`);
    });

    socket.on('send_message', async (messageData) => {
      const newMessage = await this.messageRepo.createMessage(
        messageData.id,
        messageData.sender_id,
        messageData.message,
        messageData.sender_type,
        messageData.send_at,
        messageData.status
      );

      if (messageData.image) {
        const base64Image = messageData.image.split(';base64,').pop();
        const uniqueFilename = `${Date.now()}.png`;
        fs.writeFile(
          `/uploads/${uniqueFilename}`,
          base64Image,
          { encoding: 'base64' },
          function (err) {}
        );
      }

      if (!messageData.chatId) {
        console.error('chatId no proporcionado.');
        return;
      }

      // emit the message to everyone in the chat room
      this.io.to(`chat_${messageData.chatId}`).emit(`get_message_${messageData.chatId}`, newMessage);

    socket.on('disconnect', () => {
      // Handle user disconnect logic if needed
    });
  }
}
