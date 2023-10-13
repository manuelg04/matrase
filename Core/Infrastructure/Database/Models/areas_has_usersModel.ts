import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType
} from 'sequelize-typescript';
import UsersModel from './UserModels';
import AreasModel from './areasModel';

@Table({
  tableName: 'areas_has_users'
})
export default class AreasHasUsersModel extends Model<AreasHasUsersModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number | undefined;

  @ForeignKey(() => UsersModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true
  })
  users_id!: number;

  @ForeignKey(() => AreasModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true
  })
  areas_id!: number;
}
