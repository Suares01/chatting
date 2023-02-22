import { User } from '@app/entities/user/user';
import { UnauthorizedError } from '@app/errors/unauthorized';
import { UsersRepository } from '@app/repositories/users-repository';
import { HashService } from '@infra/hash/hash-service';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use-case';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

@Injectable()
export class ValidateUser implements UseCase<Request, Response> {
  constructor(
    private usersRepository: UsersRepository,
    private hashService: HashService,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedError('email or password incorrect');

    if (user.disabledAt)
      throw new UnauthorizedError('this account is disabled');

    const comparePasswords = await this.hashService.compare(
      password,
      user.password.value,
    );

    if (!comparePasswords)
      throw new UnauthorizedError('email or password incorrect');

    return {
      user,
    };
  }
}
