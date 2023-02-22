import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';
import { Password } from './password';

describe('User password', () => {
  it('should be able to create an user password', () => {
    const password = new Password('John1234');

    expect(password.value).toBe('John1234');
  });

  it('should not be able to create a too short password', () => {
    expect(() => new Password('123jonh')).toThrow(UnprocessableEntityError);
  });

  it('should not be able to create a password within a letter', () => {
    expect(() => new Password('12345678910')).toThrow(UnprocessableEntityError);
  });

  it('should not be able to create a password within a number', () => {
    expect(() => new Password('john_doe@')).toThrow(UnprocessableEntityError);
  });
});
