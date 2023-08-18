import ChatRow from "@/components/chat/chat-row";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import { FindAllChatsInThread, FindChatThreadByID } from "./reporting-service";

interface Props {
  chatId: string;
}

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

  return (
    <Card className="h-full relative">
      <div className="h-full rounded-md overflow-y-auto">
        <div className="flex justify-center p-4">
          <Tabs defaultValue={chatThread.model}>
            <TabsList className="grid w-full grid-cols-2 h-12 items-stretch">
              <TabsTrigger disabled={true} value="GPT-3.5">
                ⚡ GPT-3.5
              </TabsTrigger>
              <TabsTrigger disabled={true} value="GPT-4">
                ✨ GPT-4
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className=" pb-[80px] ">
          {chats.map((message, index) => (
            <ChatRow
              name={
                message.role === "user" ? chatThread.useName : "AzureChatGPT"
              }
              profilePicture={message.role === "user" ? "" : "/ai-icon.png"}
              message={message.content}
              type={message.role}
              key={index}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
