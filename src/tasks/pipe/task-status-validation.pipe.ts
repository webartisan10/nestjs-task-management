import { PipeTransform, BadRequestException } from '@nestjs/common';

import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value) {
    const index = this.allowedStatuses.indexOf(value);

    if (index == -1) {
      throw new BadRequestException(`${value} is not valid`);
    }
    return value;
  }
}
