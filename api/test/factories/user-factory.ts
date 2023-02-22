import { User, UserProps } from '@app/entities/user/user';
import { Email } from '@app/entities/user/value-objects/email';
import { Password } from '@app/entities/user/value-objects/password';
import { Username } from '@app/entities/user/value-objects/username';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}): User {
  return new User({
    username: new Username('john_doe'),
    email: new Email('john_doe@mail.com'),
    password: new Password('John1234@'),
    ...override,
  });
}
