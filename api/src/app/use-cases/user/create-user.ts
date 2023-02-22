import { UseCase } from '../use-case';
import { User } from '@app/entities/user/user';
import { UsersRepository } from '@app/repositories/users-repository';
import { Email } from '@app/entities/user/value-objects/email';
import { Password } from '@app/entities/user/value-objects/password';
import { Username } from '@app/entities/user/value-objects/username';
import { ConflictError } from '@app/errors/conflict';
import { HashService } from '@infra/hash/hash-service';
import { PasswordHash } from '@app/entities/user/value-objects/password-hash';
import { Injectable } from '@nestjs/common';

interface Request {
  username: string;
  email: string;
  password: string;
}

interface Response {
  user: User;
}

@Injectable()
export class CreateUser implements UseCase<Request, Response> {
  constructor(
    private usersRepository: UsersRepository,
    private hashService: HashService,
  ) {}

  async execute(request: Request): Promise<Response> {
    const user = new User({
      email: new Email(request.email),
      password: new Password(request.password),
      username: new Username(request.username),
    });

    const emailAlreadyRegistered = await this.usersRepository.findByEmail(
      user.email.value,
    );

    if (emailAlreadyRegistered)
      throw new ConflictError('email has already been registered');

    const usernameAlreadyRegistered = await this.usersRepository.findByUsername(
      user.username.value,
    );

    if (usernameAlreadyRegistered)
      throw new ConflictError('username has already been registered');

    const passwordHash = await this.hashService.hash(user.password.value);
    user.password = new PasswordHash(passwordHash);

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
