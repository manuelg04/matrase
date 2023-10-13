export interface IChatRepository {
  createChat: (users_id: number, novelties_id: number) => Promise<object>;

  getChatById: (id: number) => Promise<object>;

  // Aquí puedes agregar otros métodos si es necesario, por ejemplo:
  // updateChat, deleteChat, getChatsByUserId, etc.
}
