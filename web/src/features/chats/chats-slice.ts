import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "../authentication/authentication-slice";

export interface ChatProps {
  id: string;
  users: UserProps[];
  startedAt: string | null;
}

interface ChatsState {
  list: ChatProps[];
}

const initialState: ChatsState = {
  list: [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatsList(state, action: PayloadAction<ChatProps[]>) {
      state.list = action.payload;
    },
  },
});

export const { setChatsList } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
