import { Module } from '@nestjs/common';
import { TaskPriorityService } from './task_priority.service';
import { TaskPriorityController } from './task_priority.controller';
import { TaskPriority } from './entities/task_priority.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskPriority]), AuthModule],
  controllers: [TaskPriorityController],
  providers: [TaskPriorityService],
})
export class TaskPriorityModule {}
