import { User } from '@app/entities/user/user';
import { FindUsers, UsersRepository } from '@app/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === id);

    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email.value === email);

    return user ?? null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find((item) => item.username.value === username);

    return user ?? null;
  }

  async findMany({ search, skip, take }: FindUsers): Promise<User[]> {
    if (search) {
      return this.users
        .filter((user) =>
          user.username.value.toLowerCase().includes(search.toLowerCase()),
        )
        .slice(skip, skip + take);
    } else {
      return this.users.slice(skip, skip + take);
    }
  }

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async save(data: User): Promise<User> {
    let user = this.users.find((item) => item.id === data.id);

    if (!user) throw new Error();

    user = data;

    return user;
  }
}
