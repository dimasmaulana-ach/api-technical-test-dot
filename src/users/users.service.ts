import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const body = createUserDto;

    const data = await this.userRepository.create(body);
    const result = await this.userRepository.save(data);

    return {
      message: 'User created successfully',
      data: result,
    };
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'ASC' | 'DESC',
    search: string,
  ) {
    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }
    if (!sort) {
      sort = 'ASC';
    }

    const query = this.userRepository.createQueryBuilder('user');
    if (search) {
      query.where('user.name LIKE :search', {
        search: `%${search}%`,
      });
    }
    if (sort) {
      query.orderBy('user.name', sort);
    }
    if (page && limit) {
      query.skip((page - 1) * limit).take(limit);
    }
    const users = await query.getManyAndCount();
    const total = users[1];
    const data = users[0];
    const totalPages = Math.ceil(total / limit);
    const currentPage = page || 1;
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
    const nextPage = hasNextPage ? currentPage + 1 : null;
    const prevPage = hasPrevPage ? currentPage - 1 : null;
    return {
      message: 'Users retrieved successfully',
      data: {
        items: data,
        pagination: {
          totalItems: total,
          totalPages: totalPages,
          limit: limit,
          currentPage: currentPage,
          nextPage: nextPage,
          prevPage: prevPage,
        },
      },
    };
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return {
        message: 'User not found',
      };
    }
    return {
      message: 'User retrieved successfully',
      data: user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    if (!user) {
      return {
        message: 'User not found',
      };
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepository.update(id, updateUserDto);

    const updatedUserData = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    return {
      message: 'User updated successfully',
      data: updatedUserData,
    };
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      return {
        message: 'User not found',
      };
    }
    await this.userRepository.delete(id);
    return {
      message: 'User deleted successfully',
    };
  }
}
