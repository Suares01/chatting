import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import NotificationsMenu from "./notifications-menu";
import OptionsMenu from "./options-menu";
import ChatList from "./chat-list";
import { useAppSelector } from "../hooks/useAppSelector";

function UserAvatar() {
  const user = useAppSelector((state) => state.auth.user);

  return <Avatar alt={user?.username.toUpperCase()} />;
}

export default function SideBar() {
  return (
    <Drawer
      sx={{
        width: "30%",
        height: "100vh",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          height: "100vh",
          width: "30%",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <AppBar component="nav" position="relative">
        <Toolbar
          sx={{ justifyContent: "space-between", backgroundColor: "#202C33" }}
        >
          <UserAvatar />
          <Box>
            <NotificationsMenu />
            <OptionsMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <ChatList />
    </Drawer>
  );
}
