import { User } from '@app/entities/user/user';
import { FindUsers, UsersRepository } from '@app/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user ? PrismaUserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user ? PrismaUserMapper.toDomain(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user ? PrismaUserMapper.toDomain(user) : null;
  }

  async findMany(data: FindUsers): Promise<User[]> {
    const { search, skip, take } = data;

    const users = await this.prisma.user.findMany({
      where: {
        username: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take,
      skip,
    });

    return users.map(PrismaUserMapper.toDomain);
  }

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);

    const createdUser = await this.prisma.user.create({
      data,
    });

    return PrismaUserMapper.toDomain(createdUser);
  }

  async save(user: User): Promise<User> {
    const { id, ...data } = PrismaUserMapper.toPrisma(user);

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return PrismaUserMapper.toDomain(updatedUser);
  }
}
