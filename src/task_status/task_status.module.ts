import { Module } from '@nestjs/common';
import { TaskStatusService } from './task_status.service';
import { TaskStatusController } from './task_status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatus } from './entities/task_status.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus]), AuthModule],
  controllers: [TaskStatusController],
  providers: [TaskStatusService],
})
export class TaskStatusModule {}
