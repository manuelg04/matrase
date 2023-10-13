import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne
} from 'sequelize-typescript';
import AreasModel from './areasModel';
import ChatModel from './chatsModel';

@Table({
  tableName: 'novelties'
})
export default class NoveltiesModel extends Model<NoveltiesModel> {
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
  name!: string;

  @Column({
    type: DataType.TEXT
  })
  description!: string;

  @Column(DataType.STRING)
  image_path?: string;

  @ForeignKey(() => AreasModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  area_id!: number;

  @BelongsTo(() => AreasModel)
  area!: AreasModel;
}
