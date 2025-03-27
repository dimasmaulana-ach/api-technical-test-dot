import { Test, TestingModule } from '@nestjs/testing';
import { TaskPriorityController } from './task_priority.controller';
import { TaskPriorityService } from './task_priority.service';

describe('TaskPriorityController', () => {
  let controller: TaskPriorityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskPriorityController],
      providers: [TaskPriorityService],
    }).compile();

    controller = module.get<TaskPriorityController>(TaskPriorityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
