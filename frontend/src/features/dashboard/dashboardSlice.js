import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardService from "./dashboardService";

const initialState = {
  stats: {
    projects: 0,
    tasks: 0,
    users: 0,
  },
  taskStats: {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  },
  isLoading: false,
  isLoadingTaskStats: false,
  error: null,
  taskStatsError: null,
};

export const getDashboardStats = createAsyncThunk(
  "dashboard/getStats",
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getDashboardStats();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch dashboard statistics"
      );
    }
  }
);

export const getTaskDashboardStats = createAsyncThunk(
  "dashboard/getTaskStats",
  async (_, thunkAPI) => {
    try {
      return await dashboardService.getTaskDashboardStats();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch task statistics"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Admin dashboard statistics
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Task statistics for Admin, Manager and Member
      .addCase(getTaskDashboardStats.pending, (state) => {
        state.isLoadingTaskStats = true;
        state.taskStatsError = null;
      })
      .addCase(getTaskDashboardStats.fulfilled, (state, action) => {
        state.isLoadingTaskStats = false;
        state.taskStats = action.payload;
      })
      .addCase(getTaskDashboardStats.rejected, (state, action) => {
        state.isLoadingTaskStats = false;
        state.taskStatsError = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
