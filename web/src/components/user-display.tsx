import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserProps } from "../features/authentication/authentication-slice";

export interface UserDisplayProps {
  user: UserProps | null;
}

export default function UserDisplay({ user }: UserDisplayProps) {
  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center" gap={1}>
      <Avatar alt={user?.username.toUpperCase()} />
      <Typography>{user?.username}</Typography>
    </Box>
  );
}
