import { Username } from '@app/entities/user/value-objects/username';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { ListUsers } from './list-users';

describe('List users', () => {
  it('should be able to list registered users', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const listUsers = new ListUsers(usersRepository);

    usersRepository.users = new Array(20).fill(makeUser());

    const { users } = await listUsers.execute({
      skip: 0,
      take: 4,
      search: '',
    });

    expect(users).toHaveLength(4);
  });

  it('should be able to list registered users by search username', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const listUsers = new ListUsers(usersRepository);

    usersRepository.users = new Array(20).fill(makeUser());
    usersRepository.users.push(makeUser({ username: new Username('mike') }));
    usersRepository.users.push(makeUser({ username: new Username('michael') }));

    const { users } = await listUsers.execute({
      skip: 0,
      take: 4,
      search: 'mi',
    });

    expect(users).toHaveLength(2);
  });
});
