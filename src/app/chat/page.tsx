import { Card } from "@/components/ui/card";
import { NewChat } from "@/features/chat/chat-menu/new-chat";
import { FindAllChatThreadForCurrentUser } from "@/features/chat/chat-thread-service";
import { redirect } from "next/navigation";

export default async function Home() {
  const chats = await FindAllChatThreadForCurrentUser();
  if (chats.length > 0) {
    redirect(`/chat/${chats[0].id}`);
  }

  return (
    <div className="h-full flex justify-center items-center">
      <Card className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <NewChat></NewChat>
      </Card>
    </div>
  );
}
