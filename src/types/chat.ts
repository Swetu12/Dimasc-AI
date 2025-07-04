
export interface Message {
  response: string;
}

export interface ChatSession {
  id: number;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatStoreTypes {
  chatResponse: ChatResponse[];
  setChatResponse: (data: ChatResponse) => void;
  currentChatId: number | null;
  setCurrentChatId: (id: number | null) => void;
  clearCurrentChatId: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isSendingMessage: boolean;
  setIsSendingMessage: (isSending: boolean) => void;
}

interface ChatResponse {
  response: string;
}

export interface ChatTitle {
  title: string;
}

export interface ChatMessage {
  id: number;
  chatId: number;
  sender: 'AI' | 'USER';
  content: string;
  response?: string;
  createdAt: string;
}

export interface ChatOptionMenuModalProps {
  currentTitle: string;
  onSave: (newTitle: string) => void;
  onDelete: () => void;
  isOptionMenuOpen: boolean;
  setIsOptionMenuOpen: (isOpen: boolean) => void;
}