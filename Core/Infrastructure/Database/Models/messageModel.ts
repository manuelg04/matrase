import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany
} from 'sequelize-typescript';

import ChatModel from './chatsModel';
import MessageFilesModel from './messageFilesModel';

@Table({ tableName: 'messages' })
export default class MessageModel extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.TEXT
  })
  messages!: string;

  @Column({
    type: DataType.DATE
  })
  send_at!: Date;

  @Column({
    type: DataType.TINYINT,
    defaultValue: 0
  })
  status!: number;

  @ForeignKey(() => ChatModel)
  @Column({
    type: DataType.INTEGER
  })
  chats_id!: number;

  @BelongsTo(() => ChatModel, { foreignKey: 'chats_id', targetKey: 'id' })
  chat!: ChatModel;

  @Column({
    type: DataType.INTEGER
  })
  sender_id!: number;

  @Column({
    type: DataType.STRING
  })
  sender_type!: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  updatedAt!: Date;

  @HasMany(() => MessageFilesModel, {
    foreignKey: 'message_id',
    sourceKey: 'id'
  })
  files!: MessageFilesModel[];
}
