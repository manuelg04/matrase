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
  tableName: 'help_online'
})
export default class HelpOnlineModel extends Model<HelpOnlineModel> {
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
  user_id!: number;

  @Column({
    type: DataType.ENUM(
      'Actualización de documentos',
      'Operaciones',
      'Pagos',
      'Control de tráfico'
    ),
    allowNull: false
  })
  help_type!:
    | 'Actualización de documentos'
    | undefined
    | 'Operaciones'
    | undefined
    | 'Pagos'
    | undefined
    | 'Control de tráfico'
    | undefined;

  @ForeignKey(() => ChatModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  chat_id!: number;

  @BelongsTo(() => UsersModel)
  user!: UsersModel;

  @BelongsTo(() => ChatModel)
  chat!: ChatModel;
}
