import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import { TransitionGroup } from "react-transition-group";
import { useState } from "react";
import ChatListItem from "./chat-list-item";
import Search from "./search";
import { useAppSelector } from "../hooks/useAppSelector";

export default function ChatList() {
  const chats = useAppSelector((state) => state.chats.list);

  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <Search
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="procurar..."
      />
      <List>
        {chats && chats.length >= 1 ? (
          <TransitionGroup>
            {searchValue
              ? chats
                  .filter((chat) =>
                    chat.users[1].username
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  )
                  .map((chat, index) => (
                    <Collapse key={chat.id}>
                      {index > 0 && <Divider variant="inset" component="li" />}
                      <ChatListItem chat={chat} />
                    </Collapse>
                  ))
              : chats.map((chat, index) => (
                  <Collapse key={chat.id}>
                    {index > 0 && <Divider variant="inset" component="li" />}
                    <ChatListItem chat={chat} />
                  </Collapse>
                ))}
          </TransitionGroup>
        ) : (
          <p>Você não iniciou um chat com ninguém...</p>
        )}
      </List>
    </>
  );
}
