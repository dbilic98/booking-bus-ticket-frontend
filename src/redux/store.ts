import { configureStore } from "@reduxjs/toolkit";
import passengerReducer from "../features/passengerSlice";
import dateRangeSlice from "../features/dateRangeSlice";
import placesSlice from "../features/placesSlice";
import routesSlice from "../features/routesSlice";

const store = configureStore({
  reducer: {
    passenger: passengerReducer,
    dateRang: dateRangeSlice,
    places: placesSlice,
    routes: routesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
