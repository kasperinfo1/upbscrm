import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BASE_URL from '../../Pages/config/config';

export const fetchAttendanceData = createAsyncThunk(
  'attendance/fetchAttendanceData',
  async () => {
    const response = await axios.get(`${BASE_URL}/api/todays-attendance`);
    return response.data;
  }
);

const attendanceSlice = createSlice({
  name: 'Todaysattendance',
  initialState: {
    attendanceData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendanceData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendanceData = action.payload;
      })
      .addCase(fetchAttendanceData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default attendanceSlice.reducer;