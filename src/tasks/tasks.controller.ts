import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    if (!Object.keys(filterDto).length) {
      return this.taskService.getAll();
    }

    return this.taskService.getFiltered(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.create(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): boolean {
    return this.taskService.deleteById(id);
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.taskService.updateById(id, updateTaskDto);
  }
}
