import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useEffect, useRef } from "react";
import { ListChildComponentProps } from "react-window";
import { MessageProps as MessageType } from "../features/messages/messages-slice";
import { decrypt } from "../utils/encrypt";
import { formatTime } from "../utils/format-time";

export interface MessageProps extends ListChildComponentProps<MessageType[]> {
  isUserMessage: boolean;
  setSize: (index: number, size: number) => void;
}

export function Message({
  isUserMessage,
  data,
  index,
  style,
  setSize,
}: MessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);
  const message = data[index];
  const decryptedContent = decrypt(message.content);
  const sentAt = new Date(message.sentAt);
  const isRead = !!message.readAt;

  useEffect(() => {
    if (messageRef.current) {
      setSize(index, messageRef.current.clientHeight);
    }
  }, [index, setSize]);

  return (
    <Box
      component="div"
      ref={messageRef}
      sx={{
        ...style,
        width: "100%",
        display: "flex",
        height: "fit-content",
        justifyContent: isUserMessage ? "flex-end" : "flex-start",
        transform: "scaleY(-1)",
      }}
    >
      <Paper
        elevation={0}
        sx={(theme) => ({
          padding: theme.spacing(),
          margin: theme.spacing(),
          width: "fit-content",
          maxWidth: "60%",
          backgroundColor: isUserMessage ? "#005C4B" : "#202C33",
        })}
      >
        <Typography sx={{ wordBreak: "break-word" }}>
          {decryptedContent}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography
            sx={{ fontSize: 12, textAlign: "right" }}
            color="text.secondary"
          >
            {formatTime(sentAt)}
          </Typography>
          {isUserMessage && (
            <DoneAllIcon
              sx={(theme) => ({
                color: isRead ? "#53bdeb" : theme.palette.text.secondary,
                fontSize: 18,
              })}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default Message;
