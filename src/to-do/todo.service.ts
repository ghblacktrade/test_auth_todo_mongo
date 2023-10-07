import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from '../models/todo.model';
import { TodoDto } from '../dto/todo.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(TodoModel) private readonly todoModel: typeof TodoModel,
  ) {}

  async getTodo() {
    return this.getTodo().findAll();
  }

  // async getArticlesByTags(tags: string) {
  //   const tagsArray = tags.split(',');
  //   return this.getTodo.findAll({
  //     where: {
  //       // можно достать тудушки по тегу, например, если надо, можно удалить
  //     },
  //   });
  // }
  // прочие методы, которые могут понадобиться

  async createTodo(TodoDto: TodoDto) {
    return this.todoModel.create(TodoDto);
  }

  async updateTodo(id: number, TodoDto: TodoDto) {
    const todo = await this.todoModel.findByPk(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo.update(TodoDto);
  }

  async deleteTodo(id: number) {
    const todo = await this.todoModel.findByPk(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    await todo.destroy();
    return { message: 'Todo deleted successfully' };
  }
}
