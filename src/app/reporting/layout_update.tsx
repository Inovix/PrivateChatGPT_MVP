import { useAuth } from "@/features/auth/auth-api";
import ChatRow from "@/components/chat/chat-row";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, useEffect, useState } from "react";
import { FindAllChatsInThread, FindChatThreadByID } from "./reporting-service";

interface Props {
  chatId: string;
}

export const ChatReportingUI: FC<Props> = (props) => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [chatThread, setChatThread] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const chatThreads = await FindChatThreadByID(props.chatId);
      const allChats = await FindAllChatsInThread(props.chatId);
      const userChats = allChats.filter((chat) => chat.userId === user?.id);
      setChats(userChats);
      setChatThread(chatThreads[0]);
    }
    fetchData();
  }, [props.chatId, user]);

  if (!chatThread) {
    return null;
  }
