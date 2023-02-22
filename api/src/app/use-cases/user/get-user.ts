import { User } from '@app/entities/user/user';
import { NotFoundError } from '@app/errors/not-found';
import { UsersRepository } from '@app/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  userId: string;
}

interface Response {
  user: User;
}

@Injectable()
export class GetUser implements UseCase<Request, Response> {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: Request): Promise<Response> {
    const { userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) throw new NotFoundError('user not found');

    return {
      user,
    };
  }
}
