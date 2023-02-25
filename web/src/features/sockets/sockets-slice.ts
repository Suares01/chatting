import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SocketsState {
  connected: boolean;
}

const initialState: SocketsState = {
  connected: false,
};

const socketsSlice = createSlice({
  name: "sockets",
  initialState,
  reducers: {
    setConnected(state, action: PayloadAction<boolean>) {
      state.connected = action.payload;
    },
  },
});

export const { setConnected } = socketsSlice.actions;
export const socketsReducer = socketsSlice.reducer;
