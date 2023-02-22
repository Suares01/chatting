import { BadRequestError } from '@app/errors/bad-request';
import { NotFoundError } from '@app/errors/not-found';
import { UsersRepository } from '@app/repositories/users-repository';
import { HashService } from '@infra/hash/hash-service';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  userId: string;
  password: string;
}

type Response = void;

@Injectable()
export class DisableUser implements UseCase<Request, Response> {
  constructor(
    private usersRepository: UsersRepository,
    private hashService: HashService,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { password, userId } = request;

    const user = await this.usersRepository.findById(userId);

    if (!user) throw new NotFoundError('user not found');

    const comparePasswords = await this.hashService.compare(
      password,
      user.password.value,
    );

    if (!comparePasswords) throw new BadRequestError('incorrect password');

    user.disable();

    await this.usersRepository.save(user);
  }
}
