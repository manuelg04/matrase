/* eslint-disable @typescript-eslint/no-dupe-class-members */
import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
  DataType,
  BelongsToMany,
  BelongsTo
} from 'sequelize-typescript';
import AdminChatModel from './adminChatModel';
import ChatModel from './chatsModel';
import AreasHasUsersModel from './areas_has_usersModel';
import AreasModel from './areasModel';
import RolesModel from './rolesModel';
import { all } from 'axios';

@Table({
  tableName: 'users'
})
export default class UsersModel extends Model<UsersModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING
  })
  code!: string | undefined;

  @Column({
    type: DataType.STRING
  })
  name!: string | undefined;

  @Column({
    type: DataType.STRING
  })
  last_name!: string | undefined;

  @Column({
    type: DataType.STRING
  })
  company_name!: string | undefined;

  @Column({
    type: DataType.STRING
  })
  company_code_cs!: string | undefined;

  @Column({
    type: DataType.STRING
  })
  email!: string | undefined;

  @Column({
    type: DataType.STRING
  })
  password!: string | undefined;

  @Column({
    type: DataType.STRING
  })
  phone!: string | undefined;

  @Column({
    type: DataType.INTEGER
  })
  change_password!: number | undefined;

  @Column({
    type: DataType.STRING
  })
  third_party_code!: string | undefined;

  @Column({
    type: DataType.STRING
  })
  third_party_name!: string | undefined;

  @ForeignKey(() => RolesModel)
  @Column({
    type: DataType.INTEGER
  })
  role_id!: number;

  @Column({
    type: DataType.DATE
  })
  createdAt!: Date | undefined;

  @Column({
    type: DataType.DATE
  })
  updatedAt!: Date | undefined;

  @Column({
    type: DataType.STRING
  })
  code_otp!: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  area!: string | undefined;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  type_user!: string | undefined;

  // Relaciones
  @HasMany(() => AdminChatModel)
  adminChats!: AdminChatModel[];

  @HasMany(() => ChatModel)
  chats!: ChatModel[];

  @BelongsToMany(() => AreasModel, () => AreasHasUsersModel)
  areas!: AreasModel[];

  @BelongsTo(() => RolesModel)
  role!: RolesModel;
}
