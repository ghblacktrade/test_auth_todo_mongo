import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { TodoDto } from '../dto/todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('articles')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async getTodo(@Query('tags') tags?: string) {
  //     if (tags) {
  //         return this.articleService.getTodoByTags(tags);
  //     }
  //     return this.todoService.getTodo();
  // }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@Body() todoDto: TodoDto) {
    return this.todoService.createTodo(todoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTodo(@Param('id') id: number, @Body() todoDto: TodoDto) {
    return this.todoService.updateTodo(id, todoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteArticle(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }
}
