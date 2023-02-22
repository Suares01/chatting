import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';
import { Username } from './username';

describe('User username', () => {
  it('should be able to create a username', () => {
    const username = new Username('john');

    expect(username.value).toBe('john');
  });

  it('should not be able to create a too long username', () => {
    expect(() => new Username('a'.repeat(30))).toThrow(
      UnprocessableEntityError,
    );
  });

  it('should not be able to create a too short username', () => {
    expect(() => new Username('a'.repeat(3))).toThrow(UnprocessableEntityError);
  });

  it('should not be able to create a username with not allowed characters', () => {
    expect(() => new Username('john@')).toThrow(UnprocessableEntityError);
  });
});
