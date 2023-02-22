import { NotFoundError } from '@app/errors/not-found';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { GetUser } from './get-user';

describe('Get user', () => {
  it('should be able to get the user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUser = new GetUser(usersRepository);

    const fakeUser = makeUser();
    usersRepository.users.push(fakeUser);

    const { user } = await getUser.execute({ userId: fakeUser.id });

    expect(user).toEqual(fakeUser);
  });

  it('should throw an error if user is not found', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUser = new GetUser(usersRepository);

    await expect(getUser.execute({ userId: 'fake-id' })).rejects.toThrow(
      NotFoundError,
    );
  });
});
