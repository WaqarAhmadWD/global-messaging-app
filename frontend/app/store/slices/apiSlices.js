"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosApisInstance from "@/app/axios/axiosApisInstance";
import Swal from "sweetalert2";

// Async thunk action for fetching data
export const fetchData = createAsyncThunk(
  "api/fetchData",
  async (
    { url, method = "GET", data = null, type = "json", throwMe = null },
    { rejectWithValue }
  ) => {
    // Validation checks
    if (throwMe) {
      showMessage("error", throwMe === true ? "Image is required" : throwMe);
      return rejectWithValue(throwMe);
    }
    if (!url) {
      showMessage("error", "URL is required");
      return rejectWithValue("URL is required");
    }

    // Configure headers and data
    const headers = {
      "Content-Type":
        type.toLowerCase() === "form"
          ? "multipart/form-data"
          : "application/json",
    };

    if (type.toLowerCase() === "form" && data) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });
      data = formData;
    }

    try {
      const config = { headers, method, url, data };
      const response = await axiosApisInstance(config);

      if (response.error) {
        showMessage("error", response.data.error, null);
        return rejectWithValue(response.data.error);
      }

      showMessage("success", response.data.message, 3000);
      return response.data;
    } catch (err) {
      const { status, data } = err.response || {};
      const errorMessages = {
        401: "Authentication failed: Wrong credentials",
        404: "Resource not found: The requested endpoint does not exist",
        500: "Server error: Please try again later",
        400: "Bad request: Invalid input or parameters",
        403: "Access denied: You do not have permission to perform this action",
        409: "Conflict: Data already exists or is in conflict",
      };

      const errorMsg =
        data?.message ||
        data?.error ||
        errorMessages[status] ||
        "Unexpected error";
      showMessage("error", errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Utility to show messages
const showMessage = (color, message, timer = 3000) => {
  Swal.fire({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer,
    showCloseButton: true,
    customClass: {
      popup: `color-${color}`,
    },
    target: document.getElementById(color + "-toast"),
    title: message,
  });
};

// Redux Slice
const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
        showMessage(
          "loading",
          `<div class="flex gap-4 items-center"><img src="/images/O.svg" class="w-8 h-8  animate-spin"><img src="/images/logo.svg" class="h-8"></div>`,
          null
        );
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Fetch failed";
      });
  },
});

export default apiSlice.reducer;
