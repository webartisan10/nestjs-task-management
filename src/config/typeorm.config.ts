import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from '../tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'task-management-nestjs',
  entities: [Task],
  synchronize: true,
};
