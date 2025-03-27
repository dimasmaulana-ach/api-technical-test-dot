import { Module } from '@nestjs/common';
import { TaskPriorityService } from './task_priority.service';
import { TaskPriorityController } from './task_priority.controller';
import { TaskPriority } from './entities/task_priority.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TaskPriority])],
  controllers: [TaskPriorityController],
  providers: [TaskPriorityService],
})
export class TaskPriorityModule {}
