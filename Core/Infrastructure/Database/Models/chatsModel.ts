import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
  HasOne
} from 'sequelize-typescript';
import UsersModel from './UserModels';
import NoveltiesModel from './noveltiesModel';
import MessageModel from './messageModel';
import HelpOnlineModel from './helpOnlineModel';
import AdminChatModel from './adminChatModel';

@Table({
  tableName: 'chats'
})
export default class ChatModel extends Model<ChatModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @ForeignKey(() => UsersModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  users_id!: number;

  @ForeignKey(() => NoveltiesModel)
  @Column
  novelties_id!: number;

  @ForeignKey(() => HelpOnlineModel)
  @Column
  help_online_id!: number;

  @HasMany(() => MessageModel, { foreignKey: 'chats_id', sourceKey: 'id' })
  messages!: MessageModel[];

  @BelongsTo(() => UsersModel)
  user!: UsersModel;

  @BelongsTo(() => NoveltiesModel, 'novelties_id')
  novelty!: NoveltiesModel;

  @BelongsTo(() => HelpOnlineModel, 'help_online_id')
  helponlineid!: HelpOnlineModel;

  @HasOne(() => AdminChatModel, { foreignKey: 'chats_id' })
  adminChat!: AdminChatModel; // Establece la relación inversa
}
