import { configureStore } from '@reduxjs/toolkit';
import matchingReducer from './slices/matchingSlice';
import chatReducer from './slices/chatSlice';
import authReducer from './slices/authSlice';
import { localStorageUtils } from '../utils/localStorage';

const preloadedChat = localStorageUtils.loadChatState<unknown>();
const preloadedState = preloadedChat ? { chat: preloadedChat } : undefined;

export const store = configureStore({
  reducer: {
    matching: matchingReducer,
    chat: chatReducer,
    auth: authReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  localStorageUtils.saveChatState(store.getState().chat);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


