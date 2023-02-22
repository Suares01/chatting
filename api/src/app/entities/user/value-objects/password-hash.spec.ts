import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';
import { PasswordHash } from './password-hash';

describe('User password hash', () => {
  it('should be able to create an user password hash', () => {
    const hash = '$2b$10$za8hwDlfgUWLXjaE5a7IPO5UMOnOocMsxcjH5MN7J9nTwwKpZ0rOK';
    const password = new PasswordHash(hash);

    expect(password.value).toBe(hash);
  });

  it('should not be able to create an invalid password hash', () => {
    const hash = 'invalid-hash';

    expect(() => new PasswordHash(hash)).toThrow(UnprocessableEntityError);
  });
});
