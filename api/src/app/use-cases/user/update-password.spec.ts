import { PasswordHash } from '@app/entities/user/value-objects/password-hash';
import { BadRequestError } from '@app/errors/bad-request';
import { NotFoundError } from '@app/errors/not-found';
import { UnprocessableEntityError } from '@app/errors/unprocessable-entity';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { MockedHashService } from '@test/mocks/services/mocked-hash-service';
import { UpdatePassword } from './update-password';

describe('Update password', () => {
  const hashService = new MockedHashService();

  it('should be able to update the user password', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updatePassword = new UpdatePassword(usersRepository, hashService);

    const user = makeUser();
    usersRepository.users.push(user);

    hashService.compare.mockResolvedValue(true);
    hashService.hash.mockResolvedValue(
      '$2a$10$Rtc/rgxD7LIn7TPY0.By6O15YTrYcT/JNuGnqCuKMDcv17RWHmKLS',
    );

    await updatePassword.execute({
      userId: user.id,
      currentPassword: 'Current123',
      newPassword: 'John123456',
    });

    expect((usersRepository.users[0].password as PasswordHash).value).toBe(
      '$2a$10$Rtc/rgxD7LIn7TPY0.By6O15YTrYcT/JNuGnqCuKMDcv17RWHmKLS',
    );
  });

  it('should not be able to update if the new password was invalid', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updatePassword = new UpdatePassword(usersRepository, hashService);

    await expect(
      updatePassword.execute({
        userId: 'some-id',
        currentPassword: 'current',
        newPassword: '123',
      }),
    ).rejects.toThrow(UnprocessableEntityError);
  });

  it('should not be able to update if the user does not exist', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updatePassword = new UpdatePassword(usersRepository, hashService);

    await expect(
      updatePassword.execute({
        userId: 'some-id',
        currentPassword: 'current',
        newPassword: 'newPassword123',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should not be able to update if the current password is incorrect', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const updatePassword = new UpdatePassword(usersRepository, hashService);

    hashService.compare.mockResolvedValue(false);

    const user = makeUser();
    usersRepository.users.push(user);

    await expect(
      updatePassword.execute({
        userId: user.id,
        currentPassword: 'current',
        newPassword: 'newPassword123',
      }),
    ).rejects.toThrow(BadRequestError);
  });
});
