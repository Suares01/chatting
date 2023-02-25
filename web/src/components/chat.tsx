import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import { ChatProps } from "../features/chats/chats-slice";
import { useAppSelector } from "../hooks/useAppSelector";
import ChatAppBar from "./chat-app-bar";
import MessagesDisplay from "./messages-display";
import SendMessageForm from "./send-message-form";
import chatBg from "../assets/chat-background.svg";

export default function Chat() {
  const { id } = useParams();
  const chat = useAppSelector<ChatProps | undefined>((state) =>
    state.chats.list.find((item) => item.id === id)
  );

  return chat ? (
    <Stack
      height="100vh"
      sx={{
        backgroundImage: `url(${chatBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      direction="column"
    >
      <ChatAppBar chat={chat} />
      <MessagesDisplay chat={chat} />
      <SendMessageForm chat={chat} />
    </Stack>
  ) : (
    <p>chat não encontrado</p>
  );
}
