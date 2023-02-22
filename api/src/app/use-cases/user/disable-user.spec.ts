import { BadRequestError } from '@app/errors/bad-request';
import { NotFoundError } from '@app/errors/not-found';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { MockedHashService } from '@test/mocks/services/mocked-hash-service';
import { DisableUser } from './disable-user';

describe('Disable user', () => {
  const hashService = new MockedHashService();

  it('should be able to disable the user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const disableUser = new DisableUser(usersRepository, hashService);
    hashService.compare.mockResolvedValue(true);

    const user = makeUser();
    usersRepository.users.push(user);

    await disableUser.execute({
      userId: user.id,
      password: user.password.value,
    });

    expect(usersRepository.users[0].disabledAt).toEqual(expect.any(Date));
  });

  it('should not be able to disable an unregistered user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const disableUser = new DisableUser(usersRepository, hashService);

    await expect(
      disableUser.execute({ password: 'password', userId: 'some-id' }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should not be able to disable if the password is incorrect', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const disableUser = new DisableUser(usersRepository, hashService);
    hashService.compare.mockResolvedValue(false);

    const user = makeUser();
    usersRepository.users.push(user);

    await expect(
      disableUser.execute({
        userId: user.id,
        password: 'incorrect-password',
      }),
    ).rejects.toThrow(BadRequestError);
  });
});
