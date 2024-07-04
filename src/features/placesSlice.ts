import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlaces = createAsyncThunk(
  "places/fetchPlaces",
  async (prefix: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/places/search?prefix=${prefix}`
      );
      return response.data as Place[];
    } catch (error) {
      throw error;
    }
  }
);

export interface Place {
  id: number;
  placeName: string;
}

interface PlacesState {
  places: Place[];
  loading: boolean;
  error: string | null;
}

const initialState: PlacesState = {
  places: [],
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })

      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch places";
      });
  },
});

export default placesSlice.reducer;
