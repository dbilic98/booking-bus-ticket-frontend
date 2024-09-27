import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/auth-actions/login",
        {
          username,
          password,
        }
      );

      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      return response.data;
    } catch (error: any) {
      throw new Error("An error occurred");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({
    firstName,
    lastName,
    username,
    password,
  }: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
  }) => {
    try {
      await axios.post("http://localhost:8081/auth-actions/register", {
        firstName,
        lastName,
        username,
        password,
      });
    } catch (error: any) {
      throw new Error("An error occurred");
    }
  }
);

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      console.log("Logout action triggered");
      localStorage.removeItem("token");
      console.log("Token removed from localStorage");
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to register";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
