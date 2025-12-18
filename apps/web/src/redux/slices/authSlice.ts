import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserRole } from '../../types';
import { authApi, type AuthUser, type LoginPayload, type RegisterPayload } from '../../api/auth';

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

export const registerUser = createAsyncThunk<
  { user: AuthUser },
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const res = await authApi.register(payload);
    return { user: res.user };
  } catch (e) {
    return rejectWithValue((e as Error).message ?? 'Registration failed');
  }
});

export const loginUser = createAsyncThunk<
  { user: AuthUser },
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const res = await authApi.login(payload);
    return { user: res.user };
  } catch (e) {
    return rejectWithValue((e as Error).message ?? 'Login failed');
  }
});

export const fetchMe = createAsyncThunk<
  { user: AuthUser | null },
  void,
  { rejectValue: string }
>('auth/me', async (_payload, { rejectWithValue }) => {
  try {
    const res = await authApi.me();
    return { user: res.user };
  } catch (e) {
    // Not logged in is not an "error" state for the app; treat as unauthenticated.
    return { user: null };
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_payload, { rejectWithValue }) => {
    try {
      await authApi.logout();
    } catch (e) {
      return rejectWithValue((e as Error).message ?? 'Logout failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setAuthFromStorage: (
      state,
      action: PayloadAction<{ user: AuthUser | null }>,
    ) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.initialized = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Registration failed';
        state.initialized = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.initialized = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
        state.initialized = true;
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.initialized = true;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
        state.user = null;
        state.initialized = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.initialized = true;
      });
  },
});

export const { logout, clearAuthError, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;


