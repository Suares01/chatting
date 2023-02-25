import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setConnected } from "../../features/sockets/sockets-slice";
import { socket } from "../../libs/sockets";
import { useAppSelector } from "../../hooks/useAppSelector";
import Layout from "../../components/layout";
import {
  concatMessages,
  concatUnreadMessages,
  MessageProps,
  setMessagesAsRead,
} from "../../features/messages/messages-slice";

interface ReadMessageBody {
  chatId: string;
}

export default function Chats() {
  const dispatch = useDispatch();
  const isConnected = useAppSelector((state) => state.sockets.connected);
  const params = useParams();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      dispatch(setConnected(true));
    });

    socket.on("disconnect", () => {
      dispatch(setConnected(false));
    });

    socket.on("receiveMessage", (message: MessageProps) => {
      if (params.id && params.id === message.chatId) {
        socket.emit("readMessage", {
          chatId: params.id,
          senderId: message.senderId,
        });
        message.readAt = new Date().toString();
        dispatch(
          concatMessages({ chatId: message.chatId, messages: [message] })
        );
      } else {
        dispatch(
          concatMessages({ chatId: message.chatId, messages: [message] })
        );
        dispatch(
          concatUnreadMessages({
            chatId: message.chatId,
            unreadMessages: [message],
          })
        );
      }
    });

    socket.on("messagesHaveBeenRead", (data: ReadMessageBody) => {
      const { chatId } = data;
      console.log(`Read in: ${data.chatId}`);
      dispatch(setMessagesAsRead(chatId));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receiveMessage");
      socket.off("messagesHaveBeenRead");
    };
  }, [params.id]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isConnected}
      >
        <CircularProgress
          color="inherit"
          sx={{ mr: (theme) => theme.spacing() }}
        />
        Conectando
      </Backdrop>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}
