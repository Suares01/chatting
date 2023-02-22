import { ValueObject } from '@app/entities/value-object';
import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';

export class Email implements ValueObject<string> {
  private email: string;

  get value(): string {
    return this.email;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(email);
  }

  constructor(email: string) {
    const isValidEmail = this.isValidEmail(email);

    if (!isValidEmail) throw new UnprocessableEntityError('invalid email');

    this.email = email;
  }
}
