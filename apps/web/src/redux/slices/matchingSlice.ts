import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MatchingFilters as BaseMatchingFilters } from '@lexhub/types/matching';
import type { Lawyer } from '@lexhub/api-client/types';
import { fetchMatchingLawyers } from '@lexhub/api-client/matching';
import { swipeLawyer as swipeLawyerApi } from '@lexhub/api-client/lawyers';
import { localStorageUtils } from '../../utils/localStorage';

// הרחבת MatchingFilters עם שדות נוספים ל-Redux
export interface MatchingFilters extends BaseMatchingFilters {
  specialization?: string;
  minRating?: number;
  minPrice?: number;
}

export interface MatchingState {
  lawyers: Lawyer[];
  loading: boolean;
  error: string | null;
  swipedLawyerIds: string[];
  filters: MatchingFilters;
}

// טעינת פילטרים מ-localStorage אם קיימים
const loadFiltersFromStorage = (): MatchingFilters => {
  const stored = localStorageUtils.loadMatchingFilters();
  if (stored) {
    return {
      specialization: stored.specialization as string | undefined,
      minRating: stored.minRating as number | undefined,
      maxPrice: stored.maxPrice as number | undefined,
      minPrice: stored.minPrice as number | undefined,
    };
  }
  return {
    specialization: undefined,
    minRating: 0,
    maxPrice: undefined,
    minPrice: undefined,
  };
};

const initialState: MatchingState = {
  lawyers: [],
  loading: false,
  error: null,
  swipedLawyerIds: [],
  filters: loadFiltersFromStorage(),
};

export const fetchLawyers = createAsyncThunk<
  Lawyer[],
  MatchingFilters,
  { rejectValue: string }
>('matching/fetchLawyers', async (filters, { rejectWithValue }) => {
  try {
    // המרת MatchingFilters המורחב ל-BaseMatchingFilters עבור ה-API
    const baseFilters: BaseMatchingFilters = {
      specialties: filters.specialization ? [filters.specialization] : filters.specialties,
      maxDistanceKm: filters.maxDistanceKm,
      maxPrice: filters.maxPrice,
      availableNow: filters.availableNow,
    };
    return await fetchMatchingLawyers(baseFilters);
  } catch (error) {
    const message = (error as Error).message || 'Failed to load lawyers';
    return rejectWithValue(message);
  }
});

export const swipeLawyer = createAsyncThunk<
  void,
  { lawyerId: string; liked: boolean },
  { rejectValue: string }
>('matching/swipeLawyer', async ({ lawyerId, liked }, { rejectWithValue }) => {
  try {
    await swipeLawyerApi(lawyerId, liked);
  } catch (error) {
    const message = (error as Error).message || 'Failed to record swipe';
    return rejectWithValue(message);
  }
});

const matchingSlice = createSlice({
  name: 'matching',
  initialState,
  reducers: {
    clearMatchingState(state) {
      state.lawyers = [];
      state.error = null;
      state.swipedLawyerIds = [];
    },
    undoSwipe(state) {
      state.swipedLawyerIds.pop();
    },
    setFilters(state, action: PayloadAction<Partial<MatchingFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      // שמירה ב-localStorage
      localStorageUtils.saveMatchingFilters(state.filters);
    },
    resetFilters(state) {
      state.filters = {
        specialization: undefined,
        minRating: 0,
        maxPrice: undefined,
        minPrice: undefined,
      };
      localStorageUtils.clearMatchingFilters();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLawyers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLawyers.fulfilled, (state, action: PayloadAction<Lawyer[]>) => {
        state.loading = false;
        state.lawyers = action.payload;
      })
      .addCase(fetchLawyers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'אירעה שגיאה בטעינת עורכי הדין';
      })
      .addCase(swipeLawyer.fulfilled, (state, action) => {
        const { lawyerId } = action.meta.arg;
        state.swipedLawyerIds.push(lawyerId);
      });
  },
});

export const { clearMatchingState, undoSwipe, setFilters, resetFilters } = matchingSlice.actions;
export default matchingSlice.reducer;


