import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Chat from "../components/chat";
import HandleLogged from "../components/handle-logged";
import LoadData from "../components/load-data";
import NoOpenChat from "../components/no-open-chat";
import Chats from "../pages/chats";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<HandleLogged />}>
        <Route element={<LoadData />}>
          <Route path="/chats" element={<Chats />}>
            <Route index element={<NoOpenChat />} />
            <Route path=":id" element={<Chat />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default function AppRoutes() {
  return <RouterProvider router={routes} />;
}
