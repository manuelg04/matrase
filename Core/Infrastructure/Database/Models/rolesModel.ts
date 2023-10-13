// rolesModel.ts

import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import UsersModel from './UserModels';

@Table({
  tableName: 'roles'
})
export default class RolesModel extends Model<RolesModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string; // 'administrador', 'conductor', 'propietario', 'propietario-conductor'...

  @HasMany(() => UsersModel)
  users!: UsersModel[];
}
