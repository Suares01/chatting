import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageProps {
  id: string;
  content: string;
  chatId: string;
  receiverId: string;
  senderId: string;
  readAt: string | null;
  sentAt: string;
}

export interface MessagesList {
  chatId: string;
  offset: string;
  messages: MessageProps[];
  unreadMessages: MessageProps[];
  count: number;
}

interface MessagesState {
  list: MessagesList[];
}

type CreateMessage = Pick<
  MessageProps,
  "content" | "chatId" | "receiverId" | "senderId"
>;

export class Message {
  public static create(data: CreateMessage): MessageProps {
    const { chatId, content, receiverId, senderId } = data;
    return {
      id: crypto.randomUUID(),
      content,
      chatId,
      receiverId,
      senderId,
      readAt: null,
      sentAt: new Date().toString(),
    };
  }
}

const initialState: MessagesState = {
  list: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessagesList(state, action: PayloadAction<MessagesList[]>) {
      state.list = action.payload;
    },
    concatMessages(
      state,
      action: PayloadAction<
        Omit<MessagesList, "offset" | "count" | "unreadMessages">
      >
    ) {
      const index = state.list.findIndex(
        (item) => item.chatId === action.payload.chatId
      );

      state.list[index].messages = [
        ...action.payload.messages,
        ...state.list[index].messages,
      ];
    },
    concatMessagesAtTheEnd(
      state,
      action: PayloadAction<Omit<MessagesList, "count" | "unreadMessages">>
    ) {
      const index = state.list.findIndex(
        (item) => item.chatId === action.payload.chatId
      );

      state.list[index].messages = [
        ...state.list[index].messages,
        ...action.payload.messages,
      ];
      state.list[index].offset = action.payload.offset;
    },
    concatUnreadMessages(
      state,
      action: PayloadAction<Omit<MessagesList, "count" | "offset" | "messages">>
    ) {
      const index = state.list.findIndex(
        (item) => item.chatId === action.payload.chatId
      );

      state.list[index].unreadMessages = [
        ...action.payload.unreadMessages,
        ...state.list[index].unreadMessages,
      ];
    },
    setMessagesAsRead(state, action: PayloadAction<string>) {
      const index = state.list.findIndex(
        (item) => item.chatId === action.payload
      );

      state.list[index].unreadMessages.length = 0;
      state.list[index].messages = state.list[index].messages.map((message) => {
        if (!message.readAt) {
          return {
            ...message,
            readAt: new Date().toString(),
          };
        } else {
          return message;
        }
      });
    },
  },
});

export const {
  concatMessages,
  setMessagesList,
  concatMessagesAtTheEnd,
  concatUnreadMessages,
  setMessagesAsRead,
} = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
