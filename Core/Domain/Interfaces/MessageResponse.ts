/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Message {
  id: number;
  sender_id: number;
  messages: string;
  send_at: Date;
  sender_type: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: number;
  files?: MessageFile[]; // relación HasMany con MessageFilesModel.
}

export interface MessageFile {
  id: number;
  path: string;
  mime_type?: string;
  message_id: number;
  message: any;
}
