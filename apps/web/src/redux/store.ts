import { configureStore } from '@reduxjs/toolkit';
import matchingReducer from './slices/matchingSlice';
import chatReducer, { hydrateChatState, type ChatState } from './slices/chatSlice';
import authReducer from './slices/authSlice';
import { localStorageUtils } from '../utils/localStorage';

export const store = configureStore({
  reducer: {
    matching: matchingReducer,
    chat: chatReducer,
    auth: authReducer,
  },
  // Important: avoid passing preloadedState here (it can confuse TS inference for Reducer preloaded state types).
});

const preloadedChat = localStorageUtils.loadChatState<ChatState>();
if (preloadedChat) {
  store.dispatch(hydrateChatState(preloadedChat));
}

store.subscribe(() => {
  localStorageUtils.saveChatState(store.getState().chat);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


