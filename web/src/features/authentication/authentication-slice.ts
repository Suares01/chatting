import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

export interface UserProps {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface AuthenticationState {
  user: UserProps | null;
}

const initialState: AuthenticationState = {
  user: null,
};

const cookies = new Cookies();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProps>) {
      state.user = action.payload;
    },
    logout(state) {
      cookies.remove("chatting:accesstoken", { path: "/" });
      cookies.remove("chatting:refreshtoken", { path: "/" });
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
