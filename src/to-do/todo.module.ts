import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoModel } from '../models/todo.model';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
  imports: [SequelizeModule.forFeature([TodoModel])],
})
export class TodoModule {}
