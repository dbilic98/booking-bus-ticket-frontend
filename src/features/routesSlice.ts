import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRoutes = createAsyncThunk(
  "routes/fetchRoutes",
  async (params: SearchParams) => {
    const { startPlaceId, endPlaceId, scheduleDate, endScheduleDate } = params;

    const url = endScheduleDate
      ? `http://localhost:8081/routes?startPlaceId=${startPlaceId}&endPlaceId=${endPlaceId}&scheduleDate=${scheduleDate}&endScheduleDate=${endScheduleDate}`
      : `http://localhost:8081/routes?startPlaceId=${startPlaceId}&endPlaceId=${endPlaceId}&scheduleDate=${scheduleDate}`;

    try {
      const response = await axios.get(url);
      return response.data as SearchParams[];
    } catch (error) {
      throw error;
    }
  }
);
export interface Schedule {
  id: number;
  scheduleDate: string;
  departureTime: string;
  arrivalTime: string;
  companyName: string;
}

export interface Route {
  id: number;
  startPlaceId: number;
  endPlaceId: number;
  scheduleDate: string;
  endScheduleDate?: string;
  basePrice: number;
  totalDistance: number;
  scheduleList: Schedule[];
}

export interface SearchParams {
  startPlaceId: number;
  endPlaceId: number;
  scheduleDate: string;
  endScheduleDate?: string;
}

interface SelectedRoute {
  basePrice: number;
  departureTime: string;
  arrivalTime: string;
}

interface RoutesState {
  selectedRoute: SelectedRoute | null;
  routes: SearchParams[];
  loading: boolean;
  error: string | null;
}

const initialState: RoutesState = {
  selectedRoute: null,
  routes: [],
  loading: false,
  error: null,
};

const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setSelectedRoute: (state, action: PayloadAction<SelectedRoute>) => {
      state.selectedRoute = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.routes = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Faild to fetch routes";
      });
  },
});

export const { setSelectedRoute } = routesSlice.actions;
export default routesSlice.reducer;
