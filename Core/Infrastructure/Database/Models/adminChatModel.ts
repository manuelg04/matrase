import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import UsersModel from './UserModels';
import ChatModel from './chatsModel';

@Table({
  tableName: 'admin_chat'
})
export default class AdminChatModel extends Model<AdminChatModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number | undefined;

  @ForeignKey(() => ChatModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  chats_id!: number;

  @ForeignKey(() => UsersModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  users_id!: number;

  @BelongsTo(() => ChatModel)
  chat!: ChatModel;

  @BelongsTo(() => UsersModel)
  user!: UsersModel;
}
