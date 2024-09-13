import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../Pages/config/config';

// Async thunk to fetch holidays
export const fetchHolidays = createAsyncThunk('holidays/fetchHolidays', async () => {
  const response = await axios.get(`${BASE_URL}/api/holidays`);
  return response.data;
});

const holidaysSlice = createSlice({
  name: 'holidays',
  initialState: {
    holidaysData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHolidays.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.holidaysData = action.payload;
      })
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default holidaysSlice.reducer;
