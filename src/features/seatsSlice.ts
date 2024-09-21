import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const fetchAvailableSeats = createAsyncThunk(
  "bus/fetchAvailableSeats",
  async ({ routeId, scheduleId }: { routeId: number; scheduleId: number }) => {
    try {
      const token = getToken();
      const response = await axios.get<Seat[]>(
        `http://localhost:8081/seats?routeId=${routeId}&scheduleId=${scheduleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export interface Seat {
  id: number;
  seatNumber: number;
  free: boolean;
}

interface SeatsState {
  seats: Seat[];
  selectedSeatIds: number[];
  loading: boolean;
  error: string | null;
}

const initialState: SeatsState = {
  seats: [],
  selectedSeatIds: [],
  loading: false,
  error: null,
};

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    setSelectedSeats(state, action: PayloadAction<number[]>) {
      state.selectedSeatIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableSeats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailableSeats.fulfilled, (state, action) => {
        state.seats = action.payload;
        state.loading = false;
      })
      .addCase(fetchAvailableSeats.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.loading = false;
      });
  },
});

export const { setSelectedSeats } = seatsSlice.actions;
export default seatsSlice.reducer;
