import { useQuery } from "react-query";
import { authAxios } from "../../../libs/axios";
import { ChatProps } from "../chats-slice";

type GetChatsResponse = ChatProps[];

interface GetChatsBaseResponse {
  chats: GetChatsResponse;
}

export function useGetChats() {
  return useQuery<GetChatsResponse>(["user:chats"], async () => {
    const { data } = await authAxios.get<GetChatsBaseResponse>("/chats/list");
    return data.chats;
  });
}
