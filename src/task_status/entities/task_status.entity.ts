import { TaskManagement } from 'src/task_management/entities/task_management.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'task_status',
})
export class TaskStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  sequence: string;

  @Column({ type: 'varchar', nullable: true })
  color: string;

  /**
   * @reference: task_management
   */

  @OneToMany(
    () => TaskManagement,
    (taskManagement) => taskManagement.taskStatus,
  )
  taskManagements: TaskManagement[];

  /**
   * endreference: task_management
   */
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
