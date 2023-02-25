import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationProps {
  id: string;
  content: string;
  category: string;
  recipientId: string;
  readAt: string | null;
  createdAt: string;
}

interface NotificationsState {
  list: NotificationProps[];
}

const initialState: NotificationsState = {
  list: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotificationsList(state, action: PayloadAction<NotificationProps[]>) {
      state.list = action.payload;
    },
    concatNotification(state, action: PayloadAction<NotificationProps>) {
      state.list.concat(action.payload);
    },
  },
});

export const { concatNotification, setNotificationsList } =
  notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
