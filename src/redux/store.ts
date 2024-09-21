import { configureStore } from "@reduxjs/toolkit";
import passengerSlice from "../features/passengerSlice";
import dateRangeSlice from "../features/dateRangeSlice";
import placesSlice from "../features/placesSlice";
import routesSlice from "../features/routesSlice";
import returnRoutesSlice from "../features/returnRoutesSlice";
import seatsSlice from "../features/seatsSlice";
import companySlice from "../features/admin/companySlice";
import busSlice from "../features/admin/busSlice";
import routeAdminSlice from "../features/admin/routeAdminSlice";
import scheduleSlice from "../features/admin/scheduleSlice";
import authSlice from "../features/auth/authSlice";
const store = configureStore({
  reducer: {
    passengers: passengerSlice,
    dateRang: dateRangeSlice,
    places: placesSlice,
    routes: routesSlice,
    returnRoutes: returnRoutesSlice,
    seats: seatsSlice,
    company: companySlice,
    buses: busSlice,
    route: routeAdminSlice,
    schedule: scheduleSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
