import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUser } from "../features/authentication/api/react-query-auth";
import { setUser } from "../features/authentication/authentication-slice";
import { useGetMessages } from "../features/messages/api/react-query-messages";
import {
  MessagesList,
  setMessagesList,
} from "../features/messages/messages-slice";
import { useGetNotifications } from "../features/notifications/api/react-query-notifications";
import { setNotificationsList } from "../features/notifications/notifications-slice";
import { useGetChats } from "../features/chats/api/react-query-chats";
import { setChatsList } from "../features/chats/chats-slice";

export default function LoadData() {
  const dispatch = useDispatch();

  const {
    isLoading: loadingUser,
    data: userData,
    isSuccess: userSuccess,
  } = useGetUser();

  const {
    isLoading: loadingMessages,
    data: messages,
    isSuccess: messagesSuccess,
  } = useGetMessages({ skip: "0", take: "20" });

  const {
    data: notifications,
    isSuccess: notificationsSuccess,
    isLoading: loadingNotifications,
  } = useGetNotifications();

  const {
    data: chats,
    isSuccess: chatsSuccess,
    isLoading: loadingChats,
  } = useGetChats();

  useEffect(() => {
    if (userSuccess) dispatch(setUser(userData));

    if (messagesSuccess && userSuccess) {
      const initialMessages = messages.map<MessagesList>(
        ({ chatId, messages, count }) => ({
          chatId,
          messages,
          unreadMessages: messages.filter(
            (item) => !item.readAt && item.senderId !== userData.id
          ),
          offset: "20",
          count,
        })
      );
      dispatch(setMessagesList(initialMessages));
    }

    if (notificationsSuccess) dispatch(setNotificationsList(notifications));

    if (chatsSuccess) dispatch(setChatsList(chats));
  }, [
    userSuccess,
    messagesSuccess,
    notificationsSuccess,
    chatsSuccess,
    dispatch,
    messages,
    userData,
    notifications,
    chats,
  ]);

  if (loadingUser || loadingMessages || loadingNotifications || loadingChats)
    return <p>Carregando...</p>;

  return <Outlet />;
}
