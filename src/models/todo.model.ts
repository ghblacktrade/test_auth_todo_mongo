import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AuthModel } from './auth.model';

@Table
export class TodoModel extends Model<TodoModel> {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  isPublic: boolean;

  @ForeignKey(() => AuthModel)
  @Column
  authorId: number;

  @BelongsTo(() => AuthModel)
  owner: string;
}
