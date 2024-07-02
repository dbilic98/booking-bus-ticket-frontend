import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PassengerSlice {
  child: number;
  adult: number;
  student: number;
}

const initialState: PassengerSlice = {
  child: 0,
  adult: 0,
  student: 0,
};

const passengerSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (
      state,
      action: PayloadAction<"child" | "adult" | "student">
    ) => {
      state[action.payload] += 1;
    },
    decrement: (
      state,
      action: PayloadAction<"child" | "adult" | "student">
    ) => {
      if (state[action.payload] > 0) {
        state[action.payload] -= 1;
      }
    },
  },
});

export const { increment, decrement } = passengerSlice.actions;
export default passengerSlice.reducer;
