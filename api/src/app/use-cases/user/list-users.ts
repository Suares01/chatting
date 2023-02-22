import { User } from '@app/entities/user/user';
import { UsersRepository } from '@app/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  search: string;
  take: number;
  skip: number;
}

interface Response {
  users: User[];
}

@Injectable()
export class ListUsers implements UseCase<Request, Response> {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: Request): Promise<Response> {
    const { search, skip, take } = request;

    const users = await this.usersRepository.findMany({ search, skip, take });

    return {
      users,
    };
  }
}
