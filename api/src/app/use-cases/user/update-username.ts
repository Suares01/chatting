import { Username } from '@app/entities/user/value-objects/username';
import { ConflictError } from '@app/errors/conflict';
import { NotFoundError } from '@app/errors/not-found';
import { UsersRepository } from '@app/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  userId: string;
  newUsername: string;
}

type Response = void;

@Injectable()
export class UpdateUsername implements UseCase<Request, Response> {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: Request): Promise<Response> {
    const { newUsername, userId } = request;

    const validUsername = new Username(newUsername);

    const usernameAlreadyRegistered = await this.usersRepository.findByUsername(
      validUsername.value,
    );

    if (usernameAlreadyRegistered)
      throw new ConflictError('username has already been registered');

    const user = await this.usersRepository.findById(userId);

    if (!user) throw new NotFoundError('user not found');

    user.username = validUsername;

    await this.usersRepository.save(user);
  }
}
