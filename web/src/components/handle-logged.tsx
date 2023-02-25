import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

export default function HandleLogged() {
  const [cookies] = useCookies(["chatting:accesstoken"]);

  return cookies["chatting:accesstoken"] ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}
