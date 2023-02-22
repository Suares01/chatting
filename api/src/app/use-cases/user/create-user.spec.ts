import { Email } from '@app/entities/user/value-objects/email';
import { ConflictError } from '@app/errors/conflict';
import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { MockedHashService } from '@test/mocks/services/mocked-hash-service';
import { CreateUser } from './create-user';

describe('Create user', () => {
  const hashService = new MockedHashService();

  it('should be able to create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository, hashService);

    hashService.hash.mockResolvedValue(
      '$2b$10$za8hwDlfgUWLXjaE5a7IPO5UMOnOocMsxcjH5MN7J9nTwwKpZ0rOK',
    );

    const { user } = await createUser.execute({
      username: 'john_doe',
      email: 'john_doe@mail.com',
      password: 'John1234@',
    });

    expect(usersRepository.users).toHaveLength(1);
    expect(usersRepository.users[0]).toEqual(user);
    expect(hashService.hash).toHaveBeenCalled();
  });

  it('should not be able to create a user with invalid email, username or password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository, hashService);

    await expect(
      createUser.execute({
        username: 'john_doe@',
        email: 'john_doe@mail.com',
        password: 'John1234@',
      }),
    ).rejects.toThrow(UnprocessableEntityError);

    await expect(
      createUser.execute({
        username: 'john_doe',
        email: 'john_doe',
        password: 'John1234@',
      }),
    ).rejects.toThrow(UnprocessableEntityError);

    await expect(
      createUser.execute({
        username: 'john_doe@',
        email: 'john_doe@mail.com',
        password: '123',
      }),
    ).rejects.toThrow(UnprocessableEntityError);
  });

  it('should not be able to create a user with an existing email', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository, hashService);

    usersRepository.create(makeUser());
    const user = makeUser();

    await expect(
      createUser.execute({
        email: user.email.value,
        username: user.username.value,
        password: user.password.value,
      }),
    ).rejects.toThrow(ConflictError);
  });

  it('should not be able to create a user with an existing username', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const createUser = new CreateUser(usersRepository, hashService);

    usersRepository.create(makeUser());
    const user = makeUser({ email: new Email('john_doe2@mail.com') });

    await expect(
      createUser.execute({
        email: user.email.value,
        username: user.username.value,
        password: user.password.value,
      }),
    ).rejects.toThrow(ConflictError);
  });
});
