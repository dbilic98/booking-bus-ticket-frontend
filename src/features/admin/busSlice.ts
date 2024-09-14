import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBus = createAsyncThunk("bus/fetchBus", async () => {
  try {
    const response = await axios.get(`http://localhost:8081/buses`);
    return response.data.items as Bus[];
  } catch (error) {
    throw error;
  }
});

export const addBus = createAsyncThunk(
  "bus/addBus",
  async ({
    model,
    licensePlate,
    seats,
    companyId,
  }: {
    model: string;
    licensePlate: string;
    seats: number;
    companyId: number;
  }) => {
    try {
      const response = await axios.post("http://localhost:8081/buses", {
        model,
        licensePlate,
        seats,
        companyId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateBus = createAsyncThunk(
  "bus/updateBus",
  async ({
    id,
    model,
    licensePlate,
  }: {
    id: number;
    model: string;
    licensePlate: string;
    seats: number;
    companyId: number;
  }) => {
    try {
      const response = await axios.put(`http://localhost:8081/buses/${id}`, {
        model,
        licensePlate,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteBus = createAsyncThunk(
  "bus/deleteBus",
  async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/buses/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  }
);

export interface Bus {
  id: number;
  model: string;
  licensePlate: string;
  seats: number;
  companyId: number;
}

interface BusState {
  bus: Bus[];
  loading: boolean;
  error: string | null;
}

const initialState: BusState = {
  bus: [] as Bus[],
  loading: false,
  error: null,
};

const CompanySlice = createSlice({
  name: "bus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBus.fulfilled, (state, action) => {
        state.loading = false;
        state.bus = action.payload;
      })

      .addCase(fetchBus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch company";
      })

      .addCase(addBus.fulfilled, (state, action) => {
        state.bus.push(action.payload);
      })

      .addCase(updateBus.fulfilled, (state, action) => {
        const updateBus = action.payload;
        state.bus = state.bus.map((bus) =>
          bus.id === updateBus.id ? updateBus : bus
        );
      })

      .addCase(deleteBus.fulfilled, (state, action) => {
        const id = action.payload;
        state.bus = state.bus.filter((bus) => bus.id !== id);
      });
  },
});

export default CompanySlice.reducer;
