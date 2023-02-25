import { apiSlice } from "../../query";
import { ChatProps } from "../chats-slice";

type GetChatsResponse = ChatProps[];

interface GetChatsBaseResponse {
  chats: GetChatsResponse;
}

const chatsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<GetChatsResponse, undefined>({
      query: () => "chats/list",
      transformResponse(value: GetChatsBaseResponse) {
        return value.chats;
      },
    }),
  }),
});

export const { useGetChatsQuery } = chatsApiSlice;
