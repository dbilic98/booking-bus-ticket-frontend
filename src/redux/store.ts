import { configureStore } from "@reduxjs/toolkit";
import passengerSlice from "../features/passengerSlice";
import dateRangeSlice from "../features/dateRangeSlice";
import placesSlice from "../features/placesSlice";
import routesSlice from "../features/routesSlice";
import returnRoutesSlice from "../features/returnRoutesSlice";
import seatsSlice from "../features/seatsSlice";

const store = configureStore({
  reducer: {
    passengers: passengerSlice,
    dateRang: dateRangeSlice,
    places: placesSlice,
    routes: routesSlice,
    returnRoutes: returnRoutesSlice,
    seats: seatsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
