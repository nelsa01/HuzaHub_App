
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching availabilities
export const fetchAvailabilities = createAsyncThunk(
  'availabilities/fetchAvailabilities',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`/api/availabilities/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding a new availability
export const addAvailability = createAsyncThunk(
  'availabilities/addAvailability',
  async (availabilityData, thunkAPI) => {
    try {
      const response = await fetch('/api/availabilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(availabilityData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  availabilities: [],
  isLoading: false,
  error: null,
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailabilities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAvailabilities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availabilities = action.payload;
      })
      .addCase(fetchAvailabilities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addAvailability.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availabilities.push(action.payload);
      })
      .addCase(addAvailability.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default apiSlice.reducer;
