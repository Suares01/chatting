import MaterialLink, {
  LinkProps as MaterialLinkProps,
} from "@mui/material/Link";
import { ReactNode } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

export interface LinkProps extends MaterialLinkProps {
  children?: ReactNode;
  to: RouterLinkProps["to"];
}

export default function Link(props: LinkProps) {
  return (
    <MaterialLink component={RouterLink} {...props}>
      {props.children}
    </MaterialLink>
  );
}
