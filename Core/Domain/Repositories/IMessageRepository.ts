export interface IMessageRepository {
  createMessage: (
    chats_id: number,
    sender_id: number,
    message: string,
    sender_type: string,
    status: string,
    send_at?: Date
  ) => Promise<object>;

  getMessagesByChatId: (chats_id: number) => Promise<object>;

  updateMessage: (id: number, nuevoMensaje: string) => Promise<object>;

  deleteMessage: (id: number) => Promise<boolean>;

  getUserLastMessageStatus: (senderId: number) => Promise<string>;
}
