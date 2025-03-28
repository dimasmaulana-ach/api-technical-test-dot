import { Module } from '@nestjs/common';
import { TaskManagementService } from './task_management.service';
import { TaskManagementController } from './task_management.controller';
import { TaskManagement } from './entities/task_management.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskStatus } from 'src/task_status/entities/task_status.entity';
import { TaskPriority } from 'src/task_priority/entities/task_priority.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskManagement, TaskStatus, TaskPriority, User]),
    AuthModule,
  ],
  controllers: [TaskManagementController],
  providers: [TaskManagementService],
})
export class TaskManagementModule {}
