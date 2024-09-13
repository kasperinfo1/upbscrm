import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';import BASE_URL from '../../Pages/config/config';


// Async Thunk for fetching leave applications
export const fetchLeaveApplications = createAsyncThunk(
    'leaveApplications/fetchLeaveApplications',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getAllLeave`, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          }) 
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  const leaveApplicationsSlice = createSlice({
    name: 'leaveApplications',
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchLeaveApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(fetchLeaveApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
      builder.addCase(fetchLeaveApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
  });
  
  export default leaveApplicationsSlice.reducer;
  