import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import dateRangeSlice from "../features/dateRangeSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    dateRang: dateRangeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
