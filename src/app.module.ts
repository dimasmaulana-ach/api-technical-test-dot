import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskPriorityModule } from './task_priority/task_priority.module';
import { TaskManagementModule } from './task_management/task_management.module';
import { TaskStatusModule } from './task_status/task_status.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { MinioModule } from './minio/minio.module';

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
    ProductModule,
    CartModule,
    CartItemsModule,
    OrdersModule,
    OrderItemsModule,
    MinioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
