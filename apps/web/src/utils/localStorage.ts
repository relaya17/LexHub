/**
 * Utility functions for localStorage operations
 */

const STORAGE_KEYS = {
  MATCHING_FILTERS: 'lexhub_matching_filters',
  SEARCH_TEXT: 'lexhub_search_text',
  CHAT_STATE: 'lexhub_chat_state',
  AUTH_TOKEN: 'lexhub_auth_token',
  AUTH_USER: 'lexhub_auth_user',
  WRITE_LETTER_DRAFT: 'lexhub_write_letter_draft',
} as const;

export const localStorageUtils = {
  // Matching Filters
  saveMatchingFilters: (filters: Record<string, unknown>): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.MATCHING_FILTERS, JSON.stringify(filters));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save filters to localStorage:', error);
    }
  },

  loadMatchingFilters: (): Record<string, unknown> | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MATCHING_FILTERS);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load filters from localStorage:', error);
      return null;
    }
  },

  clearMatchingFilters: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.MATCHING_FILTERS);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to clear filters from localStorage:', error);
    }
  },

  // Search Text
  saveSearchText: (text: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCH_TEXT, text);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save search text to localStorage:', error);
    }
  },

  loadSearchText: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SEARCH_TEXT);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load search text from localStorage:', error);
      return null;
    }
  },

  clearSearchText: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SEARCH_TEXT);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to clear search text from localStorage:', error);
    }
  },

  // Chat State
  saveChatState: (chatState: unknown): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT_STATE, JSON.stringify(chatState));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save chat state to localStorage:', error);
    }
  },

  loadChatState: <T = unknown>(): T | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_STATE);
      return stored ? (JSON.parse(stored) as T) : null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load chat state from localStorage:', error);
      return null;
    }
  },

  clearChatState: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CHAT_STATE);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to clear chat state from localStorage:', error);
    }
  },

  // Auth
  saveAuthToken: (token: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save auth token:', error);
    }
  },

  loadAuthToken: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load auth token:', error);
      return null;
    }
  },

  clearAuthToken: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to clear auth token:', error);
    }
  },

  saveAuthUser: (user: unknown): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save auth user:', error);
    }
  },

  loadAuthUser: <T = unknown>(): T | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return stored ? (JSON.parse(stored) as T) : null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load auth user:', error);
      return null;
    }
  },

  clearAuthUser: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to clear auth user:', error);
    }
  },

  // Write Letter Draft
  saveWriteLetterDraft: (draft: unknown): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.WRITE_LETTER_DRAFT, JSON.stringify(draft));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to save write letter draft:', error);
    }
  },

  loadWriteLetterDraft: <T = unknown>(): T | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WRITE_LETTER_DRAFT);
      return stored ? (JSON.parse(stored) as T) : null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to load write letter draft:', error);
      return null;
    }
  },

  clearWriteLetterDraft: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.WRITE_LETTER_DRAFT);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to clear write letter draft:', error);
    }
  },
};

