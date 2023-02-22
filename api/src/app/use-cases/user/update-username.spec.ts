import { ConflictError } from '@app/errors/conflict';
import { NotFoundError } from '@app/errors/not-found';
import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { UpdateUsername } from './update-username';

describe('Update username', () => {
  it('should be able to update the username', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updateUsername = new UpdateUsername(usersRepository);

    const user = makeUser();
    usersRepository.users.push(user);

    await updateUsername.execute({ userId: user.id, newUsername: 'John_07' });

    expect(usersRepository.users[0].username.value).toBe('John_07');
  });

  it('should not be able to update if the new username is invalid', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updateUsername = new UpdateUsername(usersRepository);

    await expect(
      updateUsername.execute({ userId: 'some-id', newUsername: 'john@' }),
    ).rejects.toThrow(UnprocessableEntityError);
  });

  it('should not be able to update if new username is already registered', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updateUsername = new UpdateUsername(usersRepository);

    const user = makeUser();
    usersRepository.users.push(user);
    usersRepository.users.push(makeUser());

    await expect(
      updateUsername.execute({
        userId: 'some-id',
        newUsername: user.username.value,
      }),
    ).rejects.toThrow(ConflictError);
  });

  it('should not be able to update if the user does not exist', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updateUsername = new UpdateUsername(usersRepository);

    await expect(
      updateUsername.execute({
        userId: 'some-id',
        newUsername: 'John_07',
      }),
    ).rejects.toThrow(NotFoundError);
  });
});
