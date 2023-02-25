import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/authentication/authentication-slice";
import { chatsReducer } from "./features/chats/chats-slice";
import { messagesReducer } from "./features/messages/messages-slice";
import { notificationsReducer } from "./features/notifications/notifications-slice";
import { socketsReducer } from "./features/sockets/sockets-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sockets: socketsReducer,
    notifications: notificationsReducer,
    chats: chatsReducer,
    messages: messagesReducer,
  },
  devTools: import.meta.env.DEV,
});

export type AppState = ReturnType<typeof store.getState>;
