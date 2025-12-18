import { configureStore } from '@reduxjs/toolkit';
import matchingReducer from './slices/matchingSlice';
import chatReducer, { type ChatState } from './slices/chatSlice';
import authReducer from './slices/authSlice';
import { localStorageUtils } from '../utils/localStorage';

type PreloadedState = {
  chat?: ChatState;
  auth?: unknown;
};

const preloadedChat = localStorageUtils.loadChatState<ChatState>();

export const store = configureStore({
  reducer: {
    matching: matchingReducer,
    chat: chatReducer,
    auth: authReducer,
  },
  preloadedState: (preloadedChat ? ({ chat: preloadedChat } as PreloadedState) : undefined),
});

store.subscribe(() => {
  localStorageUtils.saveChatState(store.getState().chat);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


