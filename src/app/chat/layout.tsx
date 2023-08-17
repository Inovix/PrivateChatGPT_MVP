import { ProtectedPage } from "@/features/auth/protected-page";
import { ChatMenu } from "@/features/chat/chat-menu/chat-menu";
import { MainMenu } from "@/features/menu/menu";

export const metadata = {
  title: "inovix.ai Private ChatGPT",
  description: "inovix.ai Private ChatGPT",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedPage>
      <div className="flex flex-col h-screen">
        <div className="flex-none">
          <MainMenu />
          <ChatMenu />
        </div>
        <div className="flex-1 overflow-y-auto p-2 md:p-4">
          {children}
        </div>
      </div>
    </ProtectedPage>
  );
}
