/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/naming-convention */
export class MessageCommand {
  private readonly chats_id: number;
  private readonly sender_id: number;
  private readonly message: string;
  private readonly sender_type: string;
  private readonly sent_at?: Date;

  constructor(
    chats_id: number,
    sender_id: number,
    message: string,
    sender_type: string,
    sent_at?: Date
  ) {
    this.chats_id = chats_id;
    this.sender_id = sender_id;
    this.message = message;
    this.sender_type = sender_type;
    this.sent_at = sent_at || new Date();
  }

  get idChat(): number {
    return this.chats_id;
  }

  get idUsuario(): number {
    return this.sender_id;
  }

  get mensaje(): string {
    return this.message;
  }

  get tipoMensaje(): string {
    return this.sender_type;
  }

  get fechaHora(): Date {
    return this.sent_at!;
  }
}
