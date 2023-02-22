import { Password } from '@app/entities/user/value-objects/password';
import { PasswordHash } from '@app/entities/user/value-objects/password-hash';
import { BadRequestError } from '@app/errors/bad-request';
import { NotFoundError } from '@app/errors/not-found';
import { UsersRepository } from '@app/repositories/users-repository';
import { HashService } from '@infra/hash/hash-service';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

type Response = void;

@Injectable()
export class UpdatePassword implements UseCase<Request, Response> {
  constructor(
    private usersRepository: UsersRepository,
    private hashService: HashService,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { currentPassword, newPassword, userId } = request;

    const validPassword = new Password(newPassword);

    const user = await this.usersRepository.findById(userId);

    if (!user) throw new NotFoundError('user not found');

    const comparePasswords = await this.hashService.compare(
      currentPassword,
      user.password.value,
    );

    if (!comparePasswords) throw new BadRequestError('incorrect password');

    const newPasswordHash = await this.hashService.hash(validPassword.value);
    user.password = new PasswordHash(newPasswordHash);

    await this.usersRepository.save(user);
  }
}
