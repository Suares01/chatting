import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { ChatProps } from "../features/chats/chats-slice";
import UserDisplay from "./user-display";
import ChatOptionsMenu from "./chat-options-menu";

interface ChatAppBarProps {
  chat: ChatProps;
}

export default function ChatAppBar({ chat }: ChatAppBarProps) {
  return (
    <AppBar component="nav" position="relative">
      <Toolbar
        sx={{ justifyContent: "space-between", backgroundColor: "#202C33" }}
      >
        <UserDisplay user={chat.users[1]} />
        <Box>
          <ChatOptionsMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
