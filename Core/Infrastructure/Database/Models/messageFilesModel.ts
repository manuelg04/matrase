import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import MessageModel from './messageModel';

@Table({
  tableName: 'message_files'
})
export default class MessageFilesModel extends Model<MessageFilesModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  path!: string | undefined;

  @Column(DataType.STRING)
  mime_type?: string | undefined;

  @ForeignKey(() => MessageModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  message_id!: number | undefined;

  @BelongsTo(() => MessageModel, { foreignKey: 'message_id', targetKey: 'id' })
  message!: MessageModel;
}
