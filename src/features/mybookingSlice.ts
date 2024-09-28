import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Place } from "./placesSlice";
import { Route, Schedule } from "./routesSlice";

const getToken = () => localStorage.getItem("token");

export const fetchReservation = createAsyncThunk(
  "reservation/fetchReservation",
  async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        "http://localhost:8081/reservations?pageNumber=0&pageSize=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.items as Reservation[];
    } catch (error) {
      throw error;
    }
  }
);

export const findPlaceById = createAsyncThunk(
  "place/findPlaceById",
  async (id: number) => {
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8081/places/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data as Place;
    } catch (error) {
      throw error;
    }
  }
);

export const findRouteById = createAsyncThunk(
  "route/findRouteById",
  async (id: number) => {
    try {
      const token = getToken();
      const response = await axios.get(`http://localhost:8081/routes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data as Route;
    } catch (error) {
      throw error;
    }
  }
);

export const findScheduleById = createAsyncThunk(
  "schedule/findScheduleById",
  async (id: number) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `http://localhost:8081/schedules/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data as Schedule;
    } catch (error) {
      throw error;
    }
  }
);

export interface Ticket {
  id: number;
  price: number;
  oneWayScheduleId: number;
  returnScheduleId: number;
  reservationId: number;
  oneWayRouteId: number;
  returnRouteId: number;
  passengerCategoryId: number;
  oneWaySeatId: number;
  returnSeatId: number;
}

export interface Reservation {
  id: number;
  dateOfReservation: Date;
  status: string;
  firstName: string;
  lastName: string;
  ticketList: Ticket[];
}

interface ReservationState {
  reservation: Reservation[];
  loading: boolean;
  error: string | null;
  places: { [key: number]: Place };
  routes: { [key: number]: Route };
  schedules: { [key: number]: Schedule };
}

const initialState: ReservationState = {
  reservation: [],
  loading: false,
  error: null,
  places: {},
  routes: {},
  schedules: {},
};

const mybookingSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload;
      })
      .addCase(fetchReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch reservation";
      })
      .addCase(findPlaceById.fulfilled, (state, action) => {
        const place = action.payload;
        state.places[place.id] = place;
      })
      .addCase(findRouteById.fulfilled, (state, action) => {
        const route = action.payload;
        state.routes[route.id] = route;
      })
      .addCase(findScheduleById.fulfilled, (state, action) => {
        const schedule = action.payload;
        state.schedules[schedule.id] = schedule;
      });
  },
});

export default mybookingSlice.reducer;
