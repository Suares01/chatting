import { ReactNode } from "react";
import Container from "@mui/material/Container";
import SideBar from "./side-bar";
import Grid from "@mui/material/Grid";

export interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container sx={{ height: "100vh" }} maxWidth="xl" disableGutters>
      <Grid container>
        <Grid item width="30%" height="100vh">
          <SideBar />
        </Grid>
        <Grid item width="70%" height="100vh">
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}
