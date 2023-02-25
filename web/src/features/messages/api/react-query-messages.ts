import { useMutation, useQuery } from "react-query";
import { authAxios } from "../../../libs/axios";
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

export function useGetMessages(args: GetMessagesResponseArgs) {
  return useQuery<GetMessagesResponse>(["user:initial-messages"], async () => {
    const { skip, take } = args;
    const { data } = await authAxios.get<GetMessagesBaseResponse>(
      `/messages/list?skip=${skip}&take=${take}`
    );
    return data.messages;
  });
}

export function useGetChatMessages() {
  return useMutation(async (args: GetChatMessagesResponseArg) => {
    const { chatId, skip, take } = args;
    const { data } = await authAxios.get<GetChatMessagesBaseResponse>(
      `/messages/${chatId}?skip=${skip}&take=${take}`
    );
    return data.messages;
  });
}
