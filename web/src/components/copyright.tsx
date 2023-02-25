import Typography, { type TypographyProps } from "@mui/material/Typography";
import Link from "@mui/material/Link";

export type CopyrightProps = TypographyProps;

export default function Copyright(props: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" target="_blank" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
