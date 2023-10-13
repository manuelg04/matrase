import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany
} from 'sequelize-typescript';
import NoveltiesModel from './noveltiesModel';
import AreasHasUsersModel from './areas_has_usersModel';
import UsersModel from './UserModels';

@Table({
  tableName: 'areas'
})
export default class AreasModel extends Model<AreasModel> {
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

  @HasMany(() => NoveltiesModel)
  novelties!: NoveltiesModel[];

  @BelongsToMany(() => UsersModel, () => AreasHasUsersModel)
  users!: UsersModel[];
}
