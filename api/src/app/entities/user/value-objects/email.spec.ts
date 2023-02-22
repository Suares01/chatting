import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';
import { Email } from './email';

describe('User email', () => {
  it('should be able to create an user email', () => {
    const email = new Email('john_doe@mail.com');

    expect(email.value).toBe('john_doe@mail.com');
  });

  it('should not be able to create an invalid email', () => {
    expect(() => new Email('invalid_email')).toThrow(UnprocessableEntityError);
  });
});
