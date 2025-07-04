
import React, {useState} from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare,
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight, PowerOff, Ellipsis, Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {ChatOptionMenuModalProps, ChatSession, ChatTitle} from '@/types/chat';
import {useTheme} from "next-themes";
import Image from "next/image";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {useChatStore} from "@/stores/chat-store";
import Cookies from "js-cookie";
import {useGetAllChatsQuery} from "@/lib/queries/Queries";
import {useCreateChatMutation, useDeleteChatMutation, useEditChatTitleMutation} from "@/lib/mutations/Mutations";

const SessionItem = ({ session, isActive, onClick }: {
  session: ChatSession;
  isActive: boolean;
  onClick: () => void;
  onDelete?: () => void;
}) => {
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState<boolean>(false)
  const { mutate: deleteChatById } = useDeleteChatMutation()
  const { mutate: editChatTitleById} = useEditChatTitleMutation()

  const handleDelete = (chatId: number) => {
    deleteChatById(chatId)
  }

  const handleEdit = (chatId: number, title: string) => {
    editChatTitleById({ chatId, title })
  }

  return (
      <div
          className={cn(
              "group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent/50",
              isActive && "bg-accent"
          )}
          onClick={onClick}
      >
        <div className={`flex flex-row items-center justify-between w-full gap-2`}>
          <div className={`flex flex-row items-center gap-2`}>
            <MessageSquare className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.title}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(session.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div
              onClick={(e) => e.stopPropagation()}
          >
            <Button
                variant="ghost"
                className="hover:cursor-pointer z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOptionMenuOpen(true);
                }}
            >
              <Ellipsis className="w-8 h-8" />
            </Button>

            <ChatOptionMenuModal
                currentTitle={session.title}
                isOptionMenuOpen={isOptionMenuOpen}
                setIsOptionMenuOpen={setIsOptionMenuOpen}
                onDelete={() => handleDelete(session.id)}
                onSave={(newTitle: string) => {
                  handleEdit(session.id, newTitle)
                }}
            />
          </div>
        </div>
      </div>
  )
}

export const Sidebar = () => {
  const {resolvedTheme, setTheme} = useTheme()
  const [isChatModalOpened, setIsChatModalOpened] = useState(false)
  const { data: chats, isLoading, error } = useGetAllChatsQuery()
  const { currentChatId, setCurrentChatId, sidebarOpen, setSidebarOpen } = useChatStore()

  const handleSessionClick = (chatId: number) => {
    setCurrentChatId(chatId)
  };

  const handleLogOut = () => {
    Cookies.remove("auth")
    window.location.reload()
  }

  return (
    <>
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-background border-r border-border transition-all duration-300 z-40 flex flex-col",
          sidebarOpen ? "w-full md:w-80" : "w-0 overflow-hidden"
        )}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center justify-center flex-row space-x-5`}>
              <Image src={`${resolvedTheme === 'light' ? '/logo-black.svg' : '/logo.svg'}`} alt={`logo`} width={40} height={40} />
              <h1 className="text-xl font-bold text-black dark:text-white">
                Dimasc AI
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="h-8 w-8 hover:cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
          <Button
            onClick={() => setIsChatModalOpened(true)}
            className="w-full background-blue hover:cursor-pointer text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {isLoading ? (
                <p className={`text-center text-muted-foreground`}>Loading...</p>
            ) : error ? (
                <p className={`text-center text-red-500`}>Failed to load chats.</p>
            ) : chats && chats.length > 0 ? (
                chats.map((chat: any) => (
                    <SessionItem
                        key={chat.id}
                        session={chat}
                        isActive={chat.id === currentChatId}
                        onClick={() => handleSessionClick(chat.id)}
                    />
                ))
            ) : (
                <p className={`text-center text-muted-foreground`}>No chats yet.</p>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border space-y-2">

          <Button
              variant="ghost"
              className="w-full justify-start hover:cursor-pointer"
              onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
              suppressHydrationWarning
          >
            {resolvedTheme === 'light' ? <Moon /> : <Sun />}
            <span suppressHydrationWarning>
        {resolvedTheme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </span>
          </Button>
          <Button
              variant="ghost"
              className="w-full justify-start hover:cursor-pointer"
              onClick={handleLogOut}
              suppressHydrationWarning
          >
            <PowerOff />Log Out
          </Button>
        </div>
      </div>

      {!sidebarOpen && (
          <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="fixed hover:cursor-pointer top-3 left-4 z-50 h-10 w-10 bg-background border border-border shadow-md hover:shadow-lg transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
      )}
      <NewChatModal isModalOpened={isChatModalOpened} setIsModalOpened={setIsChatModalOpened}/>
    </>
  );
};

const NewChatModal = ({ isModalOpened, setIsModalOpened }: {
  isModalOpened: boolean;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {register, handleSubmit, formState: {errors}} = useForm<ChatTitle>();
  const mutation = useCreateChatMutation()

  const submitNewChat = async (data: ChatTitle) => {
    mutation.mutate(data.title)
    setIsModalOpened(false);
  };

  return (
      <Dialog open={isModalOpened} onOpenChange={setIsModalOpened}>
        <DialogContent className="w-[50vw] p-6 rounded-2xl shadow-xl border border-border bg-background">
          <form onSubmit={handleSubmit(submitNewChat)}>
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-center">
                New Chat Title
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground text-center">
                Give your new chat a short, descriptive title.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <Input
                  placeholder="Enter chat title..."
                  className="text-base py-2 px-3 rounded-md border border-input shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("title", { required: "Chat title is required" })}
              />
              {errors.title && (
                  <p className="text-sm text-red-500 mt-2">{errors.title.message}</p>
              )}
            </div>

            <DialogFooter className="mt-6 flex justify-between">
              <DialogClose asChild>
                <Button variant="ghost" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="hover:cursor-pointer">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  );
};

 const ChatOptionMenuModal = ({
                                      currentTitle,
                                      onSave,
                                      onDelete,
                                      isOptionMenuOpen,
                                      setIsOptionMenuOpen,
                                    }: ChatOptionMenuModalProps) => {
  const [newTitle, setNewTitle] = useState(currentTitle);

  const handleSave = () => {
    if (newTitle.trim()) {
      onSave(newTitle.trim());
    }
  };

  return (
      <Dialog open={isOptionMenuOpen} onOpenChange={setIsOptionMenuOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Chat</DialogTitle>
            <DialogDescription>
              Change the title of this conversation or delete it permanently.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Chat Title
              </label>
              <Input
                  id="title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter new chat title"
                  className={`mt-1`}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button
                variant="destructive"
                onClick={onDelete}
                className="mr-auto hover:cursor-pointer"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline" className={`hover:cursor-pointer`}>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleSave} className={`hover:cursor-pointer`}>Save</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};