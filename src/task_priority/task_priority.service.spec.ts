import { Test, TestingModule } from '@nestjs/testing';
import { TaskPriorityService } from './task_priority.service';

describe('TaskPriorityService', () => {
  let service: TaskPriorityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskPriorityService],
    }).compile();

    service = module.get<TaskPriorityService>(TaskPriorityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
