import { ValueObject } from '@app/entities/value-object';
import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';

export class PasswordHash implements ValueObject<string> {
  private passwordHash: string;

  get value(): string {
    return this.passwordHash;
  }

  private isValidHash(passwordHash: string): boolean {
    const passwordHashRegex = /^[a-zA-Z0-9\$\.\/]{60}$/gm;

    return passwordHashRegex.test(passwordHash);
  }

  constructor(passwordHash: string) {
    const isValidHash = this.isValidHash(passwordHash);

    if (!isValidHash)
      throw new UnprocessableEntityError('invalid password hash');

    this.passwordHash = passwordHash;
  }
}
