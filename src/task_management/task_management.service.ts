import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskManagementDto } from './dto/create-task_management.dto';
import { UpdateTaskManagementDto } from './dto/update-task_management.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskManagement } from './entities/task_management.entity';
import { In, Repository } from 'typeorm';
import { TaskStatus } from 'src/task_status/entities/task_status.entity';
import { TaskPriority } from 'src/task_priority/entities/task_priority.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TaskManagementService {
  constructor(
    @InjectRepository(TaskManagement)
    private taskManagementRepository: Repository<TaskManagement>,
    @InjectRepository(TaskStatus)
    private taskStatusRepository: Repository<TaskStatus>,
    @InjectRepository(TaskPriority)
    private taskPriorityRepository: Repository<TaskPriority>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTaskManagementDto: CreateTaskManagementDto) {
    const { taskStatusId, taskPriorityId, userIds, ...taskData } =
      createTaskManagementDto;

    // Buat task management baru
    const taskManagement = this.taskManagementRepository.create(taskData);

    // Fetch TaskStatus jika diberikan
    if (taskStatusId) {
      const taskStatus = await this.taskStatusRepository.findOne({
        where: { id: taskStatusId },
      });
      if (!taskStatus)
        throw new NotFoundException(
          `Task Status with id ${taskStatusId} not found`,
        );
      taskManagement.taskStatus = taskStatus;
    }

    // Fetch TaskPriority jika diberikan
    if (taskPriorityId) {
      const taskPriority = await this.taskPriorityRepository.findOne({
        where: { id: taskPriorityId },
      });
      if (!taskPriority)
        throw new NotFoundException(
          `Task Priority with id ${taskPriorityId} not found`,
        );
      taskManagement.taskPriority = taskPriority;
    }

    // Fetch Users jika diberikan
    if (userIds && userIds.length > 0) {
      const users = await this.userRepository.findBy({ id: In(userIds) });
      if (users.length !== userIds.length) {
        throw new NotFoundException(`One or more users not found`);
      }
      taskManagement.users = users;
    }

    // Simpan ke database
    const data = await this.taskManagementRepository.save(taskManagement);

    return {
      message: 'Task Management Created',
      data,
    };
  }

  async findAll() {
    const data = await this.taskManagementRepository.find({
      relations: ['taskStatus', 'taskPriority', 'users'],
      select: {
        id: true,
        name: true,
        description: true,
        targetDate: true,
        actualDate: true,
        createdAt: true,
        updatedAt: true,
        taskStatus: {
          id: true,
          name: true,
          color: true,
        },
        taskPriority: {
          id: true,
          name: true,
          color: true,
        },
        users: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return {
      message: 'Task Management retrieved successfully',
      data,
    };
  }

  async findOne(id: string) {
    const data = await this.taskManagementRepository.findOne({
      where: { id },
      relations: ['taskStatus', 'taskPriority', 'users'],
      select: {
        id: true,
        name: true,
        description: true,
        targetDate: true,
        actualDate: true,
        createdAt: true,
        updatedAt: true,
        taskStatus: {
          id: true,
          name: true,
          color: true,
        },
        taskPriority: {
          id: true,
          name: true,
          color: true,
        },
        users: {
          id: true,
          name: true,
          email: true,
        },
      },
    });
    if (!data) {
      throw new NotFoundException(`Task Management with id ${id} not found`);
    }
    return {
      message: 'Task Management retrieved successfully',
      data,
    };
  }
  async update(id: string, updateTaskManagementDto: UpdateTaskManagementDto) {
    const { taskStatusId, taskPriorityId, userIds, ...data } =
      updateTaskManagementDto;

    // 1️⃣ Cek apakah Task Management ada
    const taskManagement = await this.taskManagementRepository.findOne({
      where: { id },
      relations: ['users'], // Load relasi users
    });
    if (!taskManagement) {
      throw new NotFoundException(`Task Management with id ${id} not found`);
    }

    // 2️⃣ Ambil taskStatus berdasarkan ID (jika diberikan)
    if (taskStatusId) {
      const taskStatus = await this.taskStatusRepository.findOne({
        where: { id: taskStatusId },
      });
      if (!taskStatus) {
        throw new NotFoundException(
          `Task Status with id ${taskStatusId} not found`,
        );
      }
      taskManagement.taskStatus = taskStatus;
    }

    // 3️⃣ Ambil taskPriority berdasarkan ID (jika diberikan)
    if (taskPriorityId) {
      const taskPriority = await this.taskPriorityRepository.findOne({
        where: { id: taskPriorityId },
      });
      if (!taskPriority) {
        throw new NotFoundException(
          `Task Priority with id ${taskPriorityId} not found`,
        );
      }
      taskManagement.taskPriority = taskPriority;
    }

    // 4️⃣ Ambil users berdasarkan userIds (jika diberikan)
    if (userIds && userIds.length > 0) {
      const users = await this.userRepository.findBy({
        id: In(userIds),
      });

      if (users.length !== userIds.length) {
        throw new NotFoundException('Some users not found');
      }

      taskManagement.users = users;
    }

    // 5️⃣ Merge update field lainnya
    this.taskManagementRepository.merge(taskManagement, data);

    // 6️⃣ Simpan perubahan
    await this.taskManagementRepository.save(taskManagement);

    // 7️⃣ Ambil data setelah update dengan relasi lengkap
    const updatedData = await this.taskManagementRepository.findOne({
      where: { id },
      relations: ['taskStatus', 'taskPriority', 'users'],
      select: {
        id: true,
        name: true,
        description: true,
        targetDate: true,
        actualDate: true,
        createdAt: true,
        updatedAt: true,
        taskStatus: {
          id: true,
          name: true,
          color: true,
        },
        taskPriority: {
          id: true,
          name: true,
          color: true,
        },
        users: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return {
      message: 'Task Management updated successfully',
      data: updatedData,
    };
  }

  async remove(id: string) {
    const taskManagement = await this.taskManagementRepository.findOne({
      where: { id },
    });
    if (!taskManagement) {
      throw new NotFoundException(`Task Management with id ${id} not found`);
    }
    await this.taskManagementRepository.delete(id);
    return {
      message: 'Task Management deleted successfully',
    };
  }
}
