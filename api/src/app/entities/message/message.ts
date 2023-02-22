import { Entity } from '../entiity';
import { Replace } from '@helpers/Replace';

export interface MessageProps {
  chatId: string;
  senderId: string;
  receiverId: string;
  content: string;
  readAt?: Date | null;
  sentAt: Date;
}

export class Message extends Entity<MessageProps> {
  public get id(): string {
    return this._id;
  }

  public get chatId(): string {
    return this.props.chatId;
  }

  public set chatId(chatId: string) {
    this.props.chatId = chatId;
  }

  public get senderId(): string {
    return this.props.senderId;
  }

  public set senderId(senderId: string) {
    this.props.senderId = senderId;
  }

  public get receiverId(): string {
    return this.props.receiverId;
  }

  public set receiverId(receiverId: string) {
    this.props.receiverId = receiverId;
  }

  public get content(): string {
    return this.props.content;
  }

  public set content(content: string) {
    this.props.content = content;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public read(): void {
    this.props.readAt = new Date();
  }

  public get sentAt(): Date {
    return this.props.sentAt;
  }

  constructor(props: Replace<MessageProps, { sentAt?: Date }>, id?: string) {
    super(
      {
        ...props,
        sentAt: props.sentAt ?? new Date(),
      },
      id,
    );
  }
}
