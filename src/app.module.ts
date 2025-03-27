import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskPriorityModule } from './task_priority/task_priority.module';
import { TaskManagementModule } from './task_management/task_management.module';
import { TaskStatusModule } from './task_status/task_status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    TaskPriorityModule,
    TaskManagementModule,
    TaskStatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
