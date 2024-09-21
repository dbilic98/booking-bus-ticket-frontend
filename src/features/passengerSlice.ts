import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

const getToken = () => localStorage.getItem("token");

export const fetchPassengerCategories = createAsyncThunk(
  "passenger-categories/fetchPassengerCategories",
  async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        `http://localhost:8081/passenger-categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.items as PassengerCategory[];
    } catch (error) {
      throw error;
    }
  }
);

export interface PassengerCategory {
  id: number;
  categoryName: string;
  discountPercentage: number;
}

export interface SelectedPassenger {
  categoryName: string;
  discountPercentage: number;
  count: number;
}

interface PassengerState {
  child: number;
  adult: number;
  student: number;
  totalPassengers: number;
  categories: PassengerCategory[];
  selectedPassengers: SelectedPassenger[];
}

const initialState: PassengerState = {
  child: 0,
  adult: 0,
  student: 0,
  totalPassengers: 0,
  categories: [],
  selectedPassengers: [],
};

const passengerSlice = createSlice({
  name: "passenger",
  initialState,
  reducers: {
    updateSelectedPassengers: (
      state,
      action: PayloadAction<SelectedPassenger>
    ) => {
      const passengerIndex = state.selectedPassengers.findIndex(
        (p) => p.categoryName === action.payload.categoryName
      );

      if (passengerIndex !== -1) {
        state.selectedPassengers[passengerIndex].count = action.payload.count;
      } else {
        state.selectedPassengers.push(action.payload);
      }
    },
    setPassengerCategories: (
      state,
      action: PayloadAction<PassengerCategory[]>
    ) => {
      state.totalPassengers = state.selectedPassengers.reduce(
        (total, passenger) => total + passenger.count,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPassengerCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const selectTotalSelectedPassengers = createSelector(
  (state: RootState) => state.passengers.selectedPassengers,
  (selectedPassengers) =>
    selectedPassengers.reduce((total, passenger) => total + passenger.count, 0)
);

export const formatPassengerSelection = (
  selectedPassengers: SelectedPassenger[]
): string[] => {
  return selectedPassengers.reduce((formattedList: string[], passenger) => {
    if (passenger.count > 0) {
      formattedList.push(`${passenger.categoryName} : ${passenger.count}`);
    }
    return formattedList;
  }, []);
};

export const calculateTotalPrice = (
  selectedPassengers: SelectedPassenger[],
  basePrice: number
): number => {
  return selectedPassengers.reduce((total, passenger) => {
    return total + basePrice * passenger.discountPercentage * passenger.count;
  }, 0);
};

export const getPassengerCategoryIds = (
  selectedPassengers: SelectedPassenger[],
  categories: PassengerCategory[]
): number[] => {
  return selectedPassengers
    .map((passenger) => {
      const category = categories.find(
        (cat) => cat.categoryName === passenger.categoryName
      );
      return category ? category.id : null;
    })
    .filter((id) => id !== null) as number[];
};

export const { updateSelectedPassengers } = passengerSlice.actions;
export default passengerSlice.reducer;
