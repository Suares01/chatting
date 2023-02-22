import { ValueObject } from '@app/entities/value-object';
import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';

export class Content implements ValueObject<string> {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContentLenght(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLenghtValid = this.validateContentLenght(content);

    if (!isContentLenghtValid)
      throw new UnprocessableEntityError(
        'invalid content lenght',
        'the content must be a minimum of 5 characters and a maximum of 240 characters',
      );

    this.content = content;
  }
}
