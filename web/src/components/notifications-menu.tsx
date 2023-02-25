import { MouseEvent, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useAppSelector } from "../hooks/useAppSelector";

export default function NotificationsMenu() {
  const notifications = useAppSelector((state) => state.notifications.list);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="inline-block">
      <IconButton
        id="notifications-button"
        aria-label="notifications"
        aria-expanded={open ? true : undefined}
        aria-controls={open ? "notifications-menu" : undefined}
        aria-haspopup={true}
        size="small"
        onClick={handleClick}
        sx={{ mr: 1 }}
      >
        <NotificationsIcon sx={{ color: "#aebac1" }} fontSize="inherit" />
      </IconButton>
      <Menu
        id="notifications-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "notifications-button",
        }}
      >
        {notifications ? (
          notifications.map((notification) => (
            <MenuItem key={notification.id}>{notification.content}</MenuItem>
          ))
        ) : (
          <MenuItem>Carregando...</MenuItem>
        )}
      </Menu>
    </Box>
  );
}
