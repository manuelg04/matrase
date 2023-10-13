/* eslint-disable @typescript-eslint/naming-convention */
import { Inject, Service } from 'typedi';
import { type IMessageRepository } from '../../Domain/Repositories/IMessageRepository';
import Mensaje from '../Database/Models/messageModel';
import { Sequelize } from 'sequelize-typescript';
import { mapMessageStatus } from '../Utils/chatHelper';

@Service()
export class MessageRepository implements IMessageRepository {
  constructor(@Inject() private readonly sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async createMessage(
    id: number,
    sender_id: number,
    messages: string,
    sender_type: string,
    status: string,
    send_at?: Date
  ): Promise<object> {
    const messagesRepo = this.sequelize.getRepository(Mensaje);
    const createdMessage = await messagesRepo.create({
      chats_id: id,
      sender_id,
      messages,
      sender_type,
      send_at,
      status
    });
    return createdMessage;
  }

  async getMessagesByChatId(chats_id: number): Promise<object[]> {
    const messagesRepo = this.sequelize.getRepository(Mensaje);
    const rawMessages = await messagesRepo.findAll({
      where: {
        chats_id
      }
    });

    const messages = rawMessages.map((rawMsg) => {
      const status = rawMsg.status !== undefined ? rawMsg.status : 0; // asignamos un valor por defecto en caso de que sea undefined.
      return {
        ...rawMsg.get(), // Esto obtiene todas las propiedades del mensaje original.
        status: mapMessageStatus(status),
        user_type: rawMsg.sender_type === 'admin' ? 'admin' : 'user'
      };
    });

    return messages;
  }

  async updateMessage(id: number, nuevoMensaje: string): Promise<object> {
    const messagesRepo = this.sequelize.getRepository(Mensaje);
    await messagesRepo.update({ mensaje: nuevoMensaje }, { where: { id } });
    const updatedMessage = await messagesRepo.findOne({ where: { id } });
    return updatedMessage;
  }

  async deleteMessage(id: number): Promise<boolean> {
    const messagesRepo = this.sequelize.getRepository(Mensaje);
    const result = await messagesRepo.destroy({ where: { id } });
    return result > 0;
  }

  async getUserLastMessageStatus(senderId: number): Promise<string> {
    const messagesRepo = this.sequelize.getRepository(Mensaje);
    const lastMessage = await messagesRepo.findOne({
      where: { sender_id: senderId },
      order: [['send_at', 'DESC']]
    });
    return lastMessage != null
      ? lastMessage.status === 1
        ? 'online'
        : 'offline'
      : 'offline';
  }
}
