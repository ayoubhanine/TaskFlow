import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  tasks: [],
  task: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
};

// Get all tasks
export const getTasks = createAsyncThunk(
  "tasks/getAll",
  async (_, thunkAPI) => {
    try {
      return await taskService.getTasks();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

// Get one task
export const getTaskById = createAsyncThunk(
  "tasks/getById",
  async (id, thunkAPI) => {
    try {
      return await taskService.getTaskById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch task"
      );
    }
  }
);

// Create task
export const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData, thunkAPI) => {
    try {
      return await taskService.createTask(taskData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, taskData }, thunkAPI) => {
    try {
      return await taskService.updateTask(id, taskData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    try {
      await taskService.deleteTask(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTaskError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get tasks
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.data;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Get one task
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.task = action.payload.data;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Create task
      .addCase(createTask.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isCreating = false;
        state.tasks.unshift(action.payload.data);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload;
      })

      // Update task
      .addCase(updateTask.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isUpdating = false;

        const updatedTask = action.payload.data;

        state.tasks = state.tasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        );

        if (state.task?._id === updatedTask._id) {
          state.task = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })

      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      });
  },
});

export const { clearTaskError } = taskSlice.actions;

export default taskSlice.reducer;
