import { type AdminChat } from './AdminResponse';
import { type Chat } from './ChatResponse';

export interface User {
  id?: number;
  code?: string;
  name?: string;
  company_name?: string;
  company_code_cs?: string;
  email?: string;
  phone?: string;
  change_password?: number;
  third_party_code?: string;
  third_party_name?: string;
  role_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  code_otp?: string;
  adminChats?: AdminChat[]; // Añadiré esto por la relación HasMany con AdminChatModel.
  chats?: Chat[]; // Añadiré esto por la relación HasMany con ChatModel.
}
