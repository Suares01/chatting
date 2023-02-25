import { MouseEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

export default function ChatOptionsMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  function closeChat() {
    navigate("/chats");
  }

  return (
    <>
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
        <MoreVertIcon sx={{ color: "#aebac1" }} fontSize="medium" />
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
        <MenuItem onClick={closeChat}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText>Fechar</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
