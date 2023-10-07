import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table
export class AuthModel extends Model<AuthModel> {
  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password_hash: string;
}
