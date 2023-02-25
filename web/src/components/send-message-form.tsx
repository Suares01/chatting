import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import ControlledTextInput from "./controlled-text-input";
import { socket } from "../libs/sockets";
import { concatMessages, Message } from "../features/messages/messages-slice";
import { ChatProps } from "../features/chats/chats-slice";
import { useDispatch } from "react-redux";
import { encrypt } from "../utils/encrypt";

interface FormData {
  content: string;
}

interface SendMessageFormProps {
  chat: ChatProps;
}

export default function SendMessageForm({ chat }: SendMessageFormProps) {
  const dispatch = useDispatch();

  const { control, handleSubmit, resetField } = useForm<FormData>({
    defaultValues: {
      content: "",
    },
  });

  function handleSendMessage({ content }: FormData) {
    const encryptedMessage = encrypt(content);

    const message = Message.create({
      content: encryptedMessage,
      chatId: chat.id,
      receiverId: chat.users[1].id,
      senderId: chat.users[0].id,
    });
    dispatch(concatMessages({ chatId: chat.id, messages: [message] }));
    socket.emit("sendMessage", message);
    resetField("content");
  }

  return (
    <Stack
      component="form"
      direction="row"
      spacing={1}
      alignItems="center"
      padding={(theme) => theme.spacing(1)}
      sx={{
        backgroundColor: "#202C33",
      }}
      onSubmit={handleSubmit(handleSendMessage)}
      noValidate
    >
      <ControlledTextInput
        control={control}
        name="content"
        label="Mensagem"
        type="text"
        variant="filled"
        maxRows={4}
        multiline
        fullWidth
      />
      <IconButton type="submit" size="large">
        <SendIcon />
      </IconButton>
    </Stack>
  );
}
