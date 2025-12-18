import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ChatUserRole = 'client' | 'lawyer';

export interface ChatUserRef {
  id: string;
  name: string;
}

export interface ChatMessage {
  id: string;
  senderRole: ChatUserRole;
  senderName: string;
  text: string;
  createdAt: number; // epoch ms
}

export interface ChatConversation {
  id: string;
  lawyer: ChatUserRef;
  client: ChatUserRef;
  messages: ChatMessage[];
  updatedAt: number; // epoch ms
}

export interface ChatState {
  conversations: Record<string, ChatConversation>;
  activeConversationId: string | null;
}

export const buildConversationId = (clientId: string, lawyerId: string): string =>
  `c:${clientId}|l:${lawyerId}`;

const initialState: ChatState = {
  conversations: {},
  activeConversationId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    ensureConversation: (
      state,
      action: PayloadAction<{
        conversationId: string;
        lawyer: ChatUserRef;
        client: ChatUserRef;
      }>,
    ) => {
      const { conversationId, lawyer, client } = action.payload;
      if (!state.conversations[conversationId]) {
        state.conversations[conversationId] = {
          id: conversationId,
          lawyer,
          client,
          messages: [],
          updatedAt: Date.now(),
        };
      }
    },

    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
    },

    sendMessage: (
      state,
      action: PayloadAction<{
        conversationId: string;
        senderRole: ChatUserRole;
        senderName: string;
        text: string;
      }>,
    ) => {
      const { conversationId, senderRole, senderName, text } = action.payload;
      const conv = state.conversations[conversationId];
      if (!conv) return;

      const message: ChatMessage = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        senderRole,
        senderName,
        text,
        createdAt: Date.now(),
      };

      conv.messages.push(message);
      conv.updatedAt = message.createdAt;
    },

    clearChat: (state) => {
      state.conversations = {};
      state.activeConversationId = null;
    },
  },
});

export const { ensureConversation, setActiveConversation, sendMessage, clearChat } =
  chatSlice.actions;

export default chatSlice.reducer;


