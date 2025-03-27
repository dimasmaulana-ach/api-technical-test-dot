import { TaskPriority } from 'src/task_priority/entities/task_priority.entity';
import { TaskStatus } from 'src/task_status/entities/task_status.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  actualDate: Date;

  /**
   * @reference: task_statis
   */

  @ManyToOne(() => TaskStatus, (taskStatus) => taskStatus.taskManagements)
  taskStatus: TaskStatus;

  /**
   * endreference: task_statis
   */

  /**
   * @reference: task_priority
   */

  @ManyToOne(() => TaskPriority, (taskPriority) => taskPriority.taskManagements)
  taskPriority: TaskPriority;

  /**
   * endreference: task_priority
   */

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
