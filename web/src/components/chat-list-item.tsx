import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { ChatProps } from "../features/chats/chats-slice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { formatTime } from "../utils/format-time";
import { decrypt } from "../utils/encrypt";

interface ChatDisplayProps {
  chat: ChatProps;
}

type LastMessageProps = ChatDisplayProps;

type LastMessageTime = ChatDisplayProps;

function LastMessage({ chat }: LastMessageProps) {
  const lastMessage = useAppSelector(
    (state) =>
      state.messages.list.find((item) => item.chatId === chat.id)?.messages[0]
  );

  const decryptedContent = lastMessage && decrypt(lastMessage.content);

  return (
    <Typography
      component="span"
      sx={{
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "block",
        overflow: "hidden",
        width: "80%",
      }}
    >
      {decryptedContent}
    </Typography>
  );
}

function UnreadMessagesCount({ chat }: LastMessageTime) {
  const unreadMessages = useAppSelector(
    (state) =>
      state.messages.list.find((item) => item.chatId === chat.id)
        ?.unreadMessages
  );

  const unreadMessagesLength = unreadMessages?.length ?? 0;

  return (
    <Badge
      sx={{
        color: (theme) => theme.palette.background.paper,
        ".MuiBadge-badge": { backgroundColor: "#005C4B" },
      }}
      badgeContent={unreadMessagesLength}
      max={999}
    />
  );
}

function LastMessageTime({ chat }: LastMessageTime) {
  const lastMessage = useAppSelector(
    (state) =>
      state.messages.list.find((item) => item.chatId === chat.id)?.messages[0]
  );

  const unreadMessagesLength = useAppSelector(
    (state) =>
      state.messages.list.find((item) => item.chatId === chat.id)
        ?.unreadMessages.length
  );

  return (
    <Typography
      sx={{ fontSize: 14 }}
      color={
        unreadMessagesLength && unreadMessagesLength > 0
          ? "#005C4B"
          : "text.secondary"
      }
    >
      {lastMessage && formatTime(lastMessage.sentAt)}
    </Typography>
  );
}

export default function ChatListItem({ chat }: ChatDisplayProps) {
  const navigate = useNavigate();

  function toChat() {
    navigate(chat.id);
  }

  return (
    <ListItem alignItems="flex-start" onClick={toChat}>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={chat.users[1].username.toUpperCase()} />
        </ListItemAvatar>
        <ListItemText
          primary={chat.users[1].username}
          secondary={<LastMessage chat={chat} />}
        />
        <ListItemSecondaryAction
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            width: "20%",
          }}
        >
          <UnreadMessagesCount chat={chat} />
          <LastMessageTime chat={chat} />
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  );
}
