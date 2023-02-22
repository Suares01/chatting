import { ValueObject } from '@app/entities/value-object';
import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';

export class Username implements ValueObject<string> {
  private username: string;

  get value(): string {
    return this.username;
  }

  private validateMaximumLength(username: string): boolean {
    return username.length <= 12;
  }

  private validateMinimumLength(username: string): boolean {
    return username.length >= 4;
  }

  private validateAllowedCharacters(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    return usernameRegex.test(username);
  }

  constructor(username: string) {
    const isValidMaximumLength = this.validateMaximumLength(username);
    const isValidMinimumLength = this.validateMinimumLength(username);
    const isValidAllowedCharacters = this.validateAllowedCharacters(username);

    if (!isValidMaximumLength)
      throw new UnprocessableEntityError(
        'username too long',
        'username can be a maximum of 12 characters',
      );

    if (!isValidMinimumLength)
      throw new UnprocessableEntityError(
        'username too short',
        'username can be a minimum of 4 characters',
      );

    if (!isValidAllowedCharacters)
      throw new UnprocessableEntityError(
        'invalid username',
        'username can only contain uppercase/lowercase letters, numbers and underscores.',
      );

    this.username = username;
  }
}
