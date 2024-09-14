import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSchedule = createAsyncThunk(
  "schedule/fetchSchedule",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/schedules/admin?pageNumber=0&pageSize=10`
      );
      return response.data.items as Schedule[];
    } catch (error) {
      throw error;
    }
  }
);

export const addSchedule = createAsyncThunk(
  "schedule/addSchedule",
  async ({
    scheduleDate,
    departureTime,
    arrivalTime,
    routeId,
    busId,
  }: {
    scheduleDate: string;
    departureTime: string;
    arrivalTime: string;
    routeId: number;
    busId: number;
  }) => {
    try {
      const response = await axios.post(`http://localhost:8081/schedules`, {
        scheduleDate,
        departureTime,
        arrivalTime,
        routeId,
        busId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateSchedule = createAsyncThunk(
  "schedule/updateSchedule",
  async ({
    id,
    scheduleDate,
    departureTime,
    arrivalTime,
    routeId,
  }: {
    id: number;
    scheduleDate: Date;
    departureTime: string;
    arrivalTime: string;
    routeId: number;
  }) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/schedules/${id}`,
        {
          scheduleDate,
          departureTime,
          arrivalTime,
          routeId,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteSchedule = createAsyncThunk(
  "schedule/deleteSchedule",
  async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/schedules/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  }
);

export interface Schedule {
  id: number;
  scheduleDate: Date;
  departureTime: string;
  arrivalTime: string;
  routeId: number;
  busId: number;
}

interface ScheduleState {
  schedule: Schedule[];
  loading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  schedule: [] as Schedule[],
  loading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload;
      })

      .addCase(fetchSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Faild to fetch schedule";
      })

      .addCase(addSchedule.fulfilled, (state, action) => {
        state.schedule.push(action.payload);
      })

      .addCase(updateSchedule.fulfilled, (state, action) => {
        const updateSchedule = action.payload;
        state.schedule = state.schedule.map((sched) =>
          sched.id === updateSchedule.id ? updateSchedule : sched
        );
      })

      .addCase(deleteSchedule.fulfilled, (state, action) => {
        const id = action.payload;
        state.schedule = state.schedule.filter((sched) => sched.id !== id);
      });
  },
});

export default scheduleSlice.reducer;
