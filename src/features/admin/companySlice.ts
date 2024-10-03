import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () => localStorage.getItem("token");

export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        `http://localhost:8081/companies?pageNumber=0&pageSize=25`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.items as Company[];
    } catch (error) {
      throw error;
    }
  }
);

export const addCompany = createAsyncThunk(
  "company/addCompany",
  async (companyName: string) => {
    try {
      const token = getToken();
      const response = await axios.post(
        "http://localhost:8081/companies",
        { companyName },
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

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ id, companyName }: { id: number; companyName: string }) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `http://localhost:8081/companies/${id}`,
        { companyName },
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

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (id: number) => {
    const token = getToken();
    await axios.delete(`http://localhost:8081/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  }
);

export interface Company {
  id: number;
  companyName: string;
}

interface CompanyState {
  company: Company[];
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  company: [],
  loading: false,
  error: null,
};

const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })

      .addCase(fetchCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch company";
      });

    builder.addCase(addCompany.fulfilled, (state, action) => {
      state.company.push(action.payload);
    });

    builder.addCase(updateCompany.fulfilled, (state, action) => {
      const updatedCompany = action.payload;
      state.company = state.company.map((comp) =>
        comp.id === updatedCompany.id ? updatedCompany : comp
      );
    });

    builder
      .addCase(deleteCompany.fulfilled, (state, action) => {
        const id = action.payload;
        state.company = state.company.filter((comp) => comp.id !== id);
        state.error = null;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete company";
      });
  },
});

export default CompanySlice.reducer;
