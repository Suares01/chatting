import { ValueObject } from '@app/entities/value-object';
import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';

export class Password implements ValueObject<string> {
  private password: string;

  get value(): string {
    return this.password;
  }

  private isValidPassword(password: string): boolean {
    const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

    return passwordRegex.test(password);
  }

  constructor(password: string) {
    const isValidPassword = this.isValidPassword(password);

    if (!isValidPassword)
      throw new UnprocessableEntityError(
        'invalid password',
        'minimum 6 characters, at least one uppercase/lowercase letter and one number with no spaces',
      );

    this.password = password;
  }
}
