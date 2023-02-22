import { Entity } from '../entiity';
import { User } from '../user/user';

export interface ChatProps {
  users: User[];
  startedAt?: Date | null;
}

export class Chat extends Entity<ChatProps> {
  public get id(): string {
    return this._id;
  }

  public get users(): User[] {
    return this.props.users;
  }

  public set users(users: User[]) {
    this.props.users = users;
  }

  public get startedAt(): Date | null | undefined {
    return this.props.startedAt;
  }

  public start(): void {
    this.props.startedAt = new Date();
  }

  constructor(props: ChatProps, id?: string) {
    super(
      {
        ...props,
      },
      id,
    );
  }
}
