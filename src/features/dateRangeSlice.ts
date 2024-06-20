import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateRangeSlice {
  startDate: string;
  endDate: string | null;
}
const getCurrentDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

const initialState: DateRangeSlice = {
  startDate: getCurrentDate(),
  endDate: null,
};

const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState,
  reducers: {
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
      state.endDate = action.payload;
    },
  },
});

export const { setStartDate, setEndDate } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;
