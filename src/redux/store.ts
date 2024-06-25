import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import dateRangeSlice from "../features/dateRangeSlice";
import placesSlice from "../features/placeSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    dateRang: dateRangeSlice,
    places: placesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
