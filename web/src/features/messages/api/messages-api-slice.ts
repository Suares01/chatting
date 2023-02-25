import { apiSlice } from "../../query";
import { MessageProps } from "../messages-slice";

interface GetMessagesResponseArgs {
  skip: string;
  take: string;
}

type GetMessagesResponse = {
  chatId: string;
  messages: MessageProps[];
  count: number;
}[];

interface GetMessagesBaseResponse {
  messages: GetMessagesResponse;
}

interface GetChatMessagesResponseArg {
  chatId: string;
  skip: string;
  take: string;
}

type GetChatMessagesResponse = MessageProps[];

interface GetChatMessagesBaseResponse {
  messages: GetChatMessagesResponse;
}

const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<GetMessagesResponse, GetMessagesResponseArgs>({
      query: ({ skip, take }) => `messages/list?skip=${skip}&take=${take}`,
      transformResponse(value: GetMessagesBaseResponse) {
        return value.messages;
      },
    }),
    getChatMessages: builder.mutation<
      GetChatMessagesResponse,
      GetChatMessagesResponseArg
    >({
      query: ({ chatId, skip, take }) => ({
        url: `messages/${chatId}?skip=${skip}&take=${take}`,
        method: "GET",
      }),
      transformResponse(value: GetChatMessagesBaseResponse) {
        return value.messages;
      },
    }),
  }),
});

export const { useGetChatMessagesMutation, useGetMessagesQuery } =
  messagesApiSlice;
