import { User, UserProps } from './user';
import { Email } from './value-objects/email';
import { Password } from './value-objects/password';
import { Username } from './value-objects/username';

describe('User', () => {
  it('should be able to create an user', () => {
    const user = new User({
      username: new Username('john_doe'),
      email: new Email('john_doe@mail.com'),
      password: new Password('John1234@'),
    });

    expect(user).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        props: expect.objectContaining<UserProps>({
          username: expect.any(Username),
          email: expect.any(Email),
          password: expect.any(Password),
          verified: false,
          chats: [],
          createdAt: expect.any(Date),
        }),
      }),
    );
  });
});
