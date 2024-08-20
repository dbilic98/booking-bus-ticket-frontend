import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

export const fetchPassengerCategories = createAsyncThunk(
  "passenger-categories/fetchPassengerCategories",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/passenger-categories`
      );

      console.log("Fetched categories:", response.data);
      return response.data.items as PassengerCategory[];
    } catch (error) {
      throw error;
    }
  }
);

interface PassengerCategory {
  categoryName: string;
  discountPercentage: number;
}

interface PassengerState {
  child: number;
  adult: number;
  student: number;
  totalPassengers: number;
  categories: PassengerCategory[];
  selectedPassengers: { [key: string]: number };
}

const initialState: PassengerState = {
  child: 0,
  adult: 0,
  student: 0,
  totalPassengers: 0,
  categories: [],
  selectedPassengers: {},
};

const passengerSlice = createSlice({
  name: "passenger",
  initialState,
  reducers: {
    updateSelectedPassengers: (
      state,
      action: PayloadAction<{ categoryName: string; count: number }>
    ) => {
      state.selectedPassengers[action.payload.categoryName] =
        action.payload.count;
    },
    setPassengerCategories: (
      state,
      action: PayloadAction<PassengerCategory[]>
    ) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPassengerCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const selectTotalSelectedPassengers = createSelector(
  (state: RootState) => state.passenger.categories,
  (state: RootState) => state.passenger.selectedPassengers,
  (
    categories: PassengerCategory[],
    selectedPassengers: { [key: string]: number }
  ) =>
    categories.reduce((total, category) => {
      return total + (selectedPassengers[category.categoryName] || 0);
    }, 0)
);

export const { updateSelectedPassengers } = passengerSlice.actions;
export default passengerSlice.reducer;
