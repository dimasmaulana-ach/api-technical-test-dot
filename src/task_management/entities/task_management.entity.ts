import { TaskPriority } from 'src/task_priority/entities/task_priority.entity';
import { TaskStatus } from 'src/task_status/entities/task_status.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'task_management',
})
export class TaskManagement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  targetDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualDate: Date;

  /**
   * @reference: task_statis
   */

  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.taskManagements, {
    nullable: true,
  })
  taskStatus: TaskStatus;

  /**
   * endreference: task_statis
   */

  /**
   * @reference: task_priority
   */

  @ManyToOne(
    () => TaskPriority,
    (taskPriority) => taskPriority.taskManagements,
    {
      nullable: true,
    },
  )
  taskPriority: TaskPriority;

  /**
   * endreference: task_priority
   */

  /**
   * @reference: users
   */
  @ManyToMany(() => User, (user) => user.tasks, {
    cascade: ['insert', 'update'],
    nullable: true,
  })
  @JoinTable()
  users: User[];

  /**
   * endreference: users
   */

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
