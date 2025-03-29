import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TaskManagement } from 'src/task_management/entities/task_management.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ['customer', 'admin'],
    default: 'customer',
    nullable: true,
  })
  role: string;

  /**
   * @Reference To Task Management Entity
   */
  @ManyToMany(() => TaskManagement, (taskManagement) => taskManagement.users, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  tasks: TaskManagement[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    if (!this.password) return;
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
