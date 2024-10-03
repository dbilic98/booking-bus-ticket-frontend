import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const fetchRoute = createAsyncThunk("route/fetchRoute", async () => {
  try {
    const token = getToken();
    const response = await axios.get(
      `http://localhost:8081/routes/admin?pageNumber=0&pageSize=25`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.items as Route[];
  } catch (error) {
    throw error;
  }
});

export const addRoute = createAsyncThunk(
  "route/addRoute",
  async ({
    basePrice,
    totalDistance,
    startPlaceId,
    endPlaceId,
  }: {
    basePrice: number;
    totalDistance: number;
    startPlaceId: number;
    endPlaceId: number;
  }) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `http://localhost:8081/routes`,
        {
          basePrice,
          totalDistance,
          startPlaceId,
          endPlaceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateRoute = createAsyncThunk(
  "route/updateRoute",
  async ({
    id,
    basePrice,
    totalDistance,
    startPlaceId,
    endPlaceId,
  }: {
    id: number;
    basePrice: number;
    totalDistance: number;
    startPlaceId: number;
    endPlaceId: number;
  }) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `http://localhost:8081/routes/${id}`,
        {
          basePrice,
          totalDistance,
          startPlaceId,
          endPlaceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteRoute = createAsyncThunk(
  "route/deleteRoute",
  async (id: number) => {
    const token = getToken();
    await axios.delete(`http://localhost:8081/routes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export interface Route {
  id: number;
  basePrice: number;
  totalDistance: number;
  startPlaceId: number;
  endPlaceId: number;
}

interface RouteState {
  route: Route[];
  loading: boolean;
  error: string | null;
}

const initialState: RouteState = {
  route: [],
  loading: false,
  error: null,
};

const routeAdminSlice = createSlice({
  name: "route",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoute.fulfilled, (state, action) => {
        state.loading = false;
        state.route = action.payload;
      })

      .addCase(fetchRoute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch route";
      })

      .addCase(addRoute.fulfilled, (state, action) => {
        state.route.push(action.payload);
      })

      .addCase(updateRoute.fulfilled, (state, action) => {
        const updateRoute = action.payload;
        state.route = state.route.map((rou) =>
          rou.id === updateRoute.id ? updateRoute : rou
        );
      })

      .addCase(deleteRoute.fulfilled, (state, action) => {
        const id = action.payload;
        state.route = state.route.filter((route) => route.id !== id);
        state.error = null;
      })
      .addCase(deleteRoute.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete route";
      });
  },
});

export default routeAdminSlice.reducer;
