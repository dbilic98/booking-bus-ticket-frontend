import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReturnRoutes = createAsyncThunk(
  "returnRoutes/fetchReturnRoutes",
  async (params: SearchReturnParams) => {
    const { startPlaceId, endPlaceId, endScheduleDate, scheduleDate } = params;

    try {
      const response = await axios.get(
        `http://localhost:8081/routes?startPlaceId=${startPlaceId}&endPlaceId=${endPlaceId}&endScheduleDate=${endScheduleDate}&scheduleDate=${scheduleDate}`
      );

      console.log("Fetched routes:", response.data);
      return response.data as SearchReturnParams[];
    } catch (error) {
      throw error;
    }
  }
);

export interface Schedule {
  id: number;
  endScheduleDate: string;
  scheduleDate: string;
  departureTime: string;
  arrivalTime: string;
  companyName: string;
}

export interface Route {
  id: number;
  startPlaceId: number;
  endPlaceId: number;
  endScheduleDate: string;
  scheduleDate: string;
  basePrice: number;
  totalDistance: number;
  scheduleList: Schedule[];
}

export interface SearchReturnParams {
  startPlaceId: number;
  endPlaceId: number;
  endScheduleDate: string;
  scheduleDate: string;
}

export interface SelectedReturnRoute {
  basePrice: number;
  departureTime: string;
  arrivalTime: string;
}

interface RoutesState {
  selectedReturnRoute: SelectedReturnRoute | null;
  routes: SearchReturnParams[];
  loading: boolean;
  error: string | null;
}

const initialState: RoutesState = {
  selectedReturnRoute: null,
  routes: [],
  loading: false,
  error: null,
};

const returnRoutesSlice = createSlice({
  name: "returnRoutes",
  initialState,
  reducers: {
    setSelectedReturnRoute: (
      state,
      action: PayloadAction<SelectedReturnRoute>
    ) => {
      state.selectedReturnRoute = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReturnRoutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReturnRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.routes = action.payload;
      })
      .addCase(fetchReturnRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Faild to fetch return routes";
      });
  },
});

export const { setSelectedReturnRoute } = returnRoutesSlice.actions;
export default returnRoutesSlice.reducer;
