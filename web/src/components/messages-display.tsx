import { useCallback, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import { useDispatch } from "react-redux";
import { VariableSizeList } from "react-window";
import { ChatProps } from "../features/chats/chats-slice";
import {
  concatMessagesAtTheEnd,
  MessageProps,
  setMessagesAsRead,
} from "../features/messages/messages-slice";
import Message from "./message";
import { useAppSelector } from "../hooks/useAppSelector";
import { useParams, useSearchParams } from "react-router-dom";
import { useInvertScrollDirection } from "../hooks/useInvertScrollDirection";
import { socket } from "../libs/sockets";
import { useGetChatMessages } from "../features/messages/api/react-query-messages";

export interface MessagesDisplayProps {
  chat: ChatProps;
}

export default function MessagesDisplay({ chat }: MessagesDisplayProps) {
  const dispatch = useDispatch();

  const { mutateAsync, isLoading } = useGetChatMessages();

  const params = useParams();

  const chatOffset = useAppSelector(
    (state) =>
      state.messages.list.find((item) => item.chatId === chat.id)
        ?.offset as string
  );
  const chatMessagesCount = useAppSelector(
    (state) =>
      state.messages.list.find((item) => item.chatId === chat.id)
        ?.count as number
  );

  const hasMoreMessages = Number(chatOffset) < chatMessagesCount;

  const [searchParams, setSearchParams] = useSearchParams({
    take: "20",
    skip: chatOffset,
  });

  const messages = useAppSelector(
    (state) =>
      state.messages.list.find((item) => item.chatId === chat.id)?.messages
  );

  const unreadMessages = useAppSelector(
    (state) =>
      state.messages.list.find((item) => item.chatId === chat.id)
        ?.unreadMessages
  );

  const listRef = useRef<VariableSizeList<MessageProps[]>>(null);
  const messagesComponentsSizeMap = useRef<{ [key: number]: number }>({});
  const setMessagesComponentsSize = useCallback(
    (index: number, size: number) => {
      listRef.current?.resetAfterIndex(index);
      messagesComponentsSizeMap.current = {
        ...messagesComponentsSizeMap.current,
        [index]: size,
      };
    },
    []
  );
  const getMessageComponentSize = (index: number) =>
    messagesComponentsSizeMap.current[index] || 40;

  const invertScrollDirection = useInvertScrollDirection(true);
  const listOuterRef = useRef<HTMLDivElement>(null);
  invertScrollDirection(listOuterRef.current);

  async function loadMoreMessages() {
    const take = searchParams.get("take") as string;
    const skip = searchParams.get("skip") as string;

    const loadedMessages = await mutateAsync({
      chatId: chat.id,
      skip,
      take,
    });

    const newOffset = String(Number(chatOffset) + Number(take));

    dispatch(
      concatMessagesAtTheEnd({
        chatId: chat.id,
        offset: newOffset,
        messages: loadedMessages,
      })
    );

    setSearchParams({ take, skip: newOffset });
  }

  useEffect(() => {
    setSearchParams({ take: "20", skip: chatOffset });
  }, [chatOffset, setSearchParams]);

  useEffect(() => {
    if (!params.id) {
      return;
    }

    if (unreadMessages && unreadMessages.length > 0) {
      socket.emit("readMessage", {
        chatId: params.id,
        senderId: chat.users[1].id,
      });
      dispatch(setMessagesAsRead(params.id));
    }

    return () => {
      socket.off("readMessage");
    };
  }, [params.id]);

  return (
    <Box flex={1}>
      {messages && (
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={(index) =>
                !hasMoreMessages || index < messages.length
              }
              itemCount={
                hasMoreMessages ? messages.length + 1 : messages.length
              }
              loadMoreItems={isLoading ? () => undefined : loadMoreMessages}
            >
              {({ onItemsRendered, ref }) => {
                ref(listRef);
                return (
                  <VariableSizeList
                    ref={listRef}
                    outerRef={listOuterRef}
                    height={height}
                    width={width}
                    itemCount={messages.length}
                    itemData={messages}
                    itemSize={getMessageComponentSize}
                    itemKey={(index) => messages[index].id}
                    onItemsRendered={onItemsRendered}
                    style={{
                      transform: "scaleY(-1)",
                    }}
                  >
                    {(listProps) => (
                      <Message
                        {...listProps}
                        setSize={setMessagesComponentsSize}
                        isUserMessage={
                          messages[listProps.index].senderId ===
                          chat.users[0].id
                        }
                      />
                    )}
                  </VariableSizeList>
                );
              }}
            </InfiniteLoader>
          )}
        </AutoSizer>
      )}
    </Box>
  );
}
