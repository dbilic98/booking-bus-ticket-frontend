import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  child: number;
  adult: number;
  student: number;
}

const initialState: CounterState = {
  child: 0,
  adult: 0,
  student: 0,
};

const counterSlice = createSlice({
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

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
