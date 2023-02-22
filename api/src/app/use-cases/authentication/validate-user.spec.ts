import { Password } from '@app/entities/user/value-objects/password';
import { UnauthorizedError } from '@app/errors/unauthorized';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { MockedHashService } from '@test/mocks/services/mocked-hash-service';
import { ValidateUser } from './validate-user';

describe('Validate user', () => {
  const hashService = new MockedHashService();

  it('should be able to validate the user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const validateUser = new ValidateUser(usersRepository, hashService);
    hashService.compare.mockResolvedValue(true);

    const fakeUser = makeUser();
    usersRepository.users.push(fakeUser);

    const { user } = await validateUser.execute({
      email: fakeUser.email.value,
      password: (fakeUser.password as Password).value,
    });

    expect(usersRepository.users[0]).toEqual(user);
  });

  it('should not be able to validate if the email is incorrect', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const validateUser = new ValidateUser(usersRepository, hashService);

    await expect(
      validateUser.execute({
        email: 'fake-email',
        password: 'fake-password',
      }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should not be able to validate if the user is disabled', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const validateUser = new ValidateUser(usersRepository, hashService);

    const fakeUser = makeUser({ disabledAt: new Date() });
    usersRepository.users.push(fakeUser);

    await expect(
      validateUser.execute({
        email: fakeUser.email.value,
        password: (fakeUser.password as Password).value,
      }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should not be able to validate if the password is incorrect', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const validateUser = new ValidateUser(usersRepository, hashService);
    hashService.compare.mockResolvedValue(false);

    const fakeUser = makeUser();
    usersRepository.users.push(fakeUser);

    await expect(
      validateUser.execute({
        email: fakeUser.email.value,
        password: (fakeUser.password as Password).value,
      }),
    ).rejects.toThrow(UnauthorizedError);
  });
});
