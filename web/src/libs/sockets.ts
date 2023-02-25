import { io } from "socket.io-client";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const accessToken = cookies.get("chatting:accesstoken");

export const socket = io(`${import.meta.env.VITE_APP_WS_BASE_URL}/messages`, {
  autoConnect: false,
  auth: {
    accessToken,
  },
});
