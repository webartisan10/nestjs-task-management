import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks;
  }

  getFiltered(filters: GetTasksFilterDto): Task[] {
    const { status, search } = filters;
    let tasks = this.getAll();

    if (status) {
      tasks = tasks.filter(task => task.status == status);
    }

    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);

    if (!task) {
      throw new NotFoundException(`The task with ID '${id}' not found`);
    }

    return task;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteById(id: string): boolean {
    // const task = this.tasks.find(task => task.id === id);
    // const index = this.tasks.indexOf(task);
    // if (index > -1) {
    //   this.tasks.splice(index, 1);
    //   return true;
    // }
    // return false;
    const found = this.getById(id);
    this.tasks = this.tasks.filter(tasks => tasks.id != id);
    return true;
  }

  updateById(id: string, updateTaskDto: UpdateTaskDto): Task {
    const { title, description, status } = updateTaskDto;
    const task = this.tasks.find(task => task.id === id);

    task.title = title ? title : task.title;
    task.description = description ? description : task.description;
    task.status = status ? status : task.status;

    return task;
  }
}
