import { defineStore } from "pinia";
import { ref } from "vue";
import axiosApisInstance from "@/server/axiosApisInstance.js";
import Swal from "sweetalert2";

export const useApiStore = defineStore("useApiStore", () => {
  // Function to show messages using Swal
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

  // Fetch data method for API calls
  const fetchData = async ({
    url = null,
    method = "GET",
    data = null,
    type = "json",
    message = true,
    error = true,
    loading = true,
    throwMe = null,
  }) => {
    if (loading) {
      showMessage(
        "loading",
        `<div class="flex gap-4 items-center"><img src="/gif/loading.gif" class="w-8 h-8"> <div>Loading...</div></div>`,
        null
      );
    }
    if (throwMe) {
      showMessage("error", throwMe === true ? "Image is required" : throwMe);
      return;
    }
    if (!url) {
      showMessage("error", "URL is required");
      return;
    }
    try {
      // Handle loading state

      // Configure headers and data for different content types
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
            // Check if the array contains File or Blob instances
            if (
              data[key].every(
                (item) => item instanceof File || item instanceof Blob
              )
            ) {
              if (data[key].length > 1) {
                data[key].forEach((file) => {
                  formData.append(key, file);
                });
              }
            } else {
              formData.append(key, JSON.stringify(data[key]));
            }
          } else {
            formData.append(key, data[key]);
          }
        });

        data = formData;
      }

      const config = { headers, method, url };
      if (method !== "GET" && data) config.data = data;

      // Perform API request
      const response = await axiosApisInstance(config);

      // Handle success response
      if (response.error) {
        if (error) showMessage("error", response.data.error);
        return { error: response.data.error };
      }
      if (message) showMessage("success", response.data.message, 3000);

      return response.data;
    } catch (err) {
      const { status, data } = err.response || {};
      let errorMsg = data?.message ? data?.message : null;
      errorMsg = data?.error ? data?.error : errorMsg;
      errorMsg =
        data?.message && data?.error
          ? `${data?.message} , ${data?.error}`
          : errorMsg;
      // Handle common errors with centralized messages
      const errorMessages = {
        401: "Authentication failed: Wrong credentials",
        404: "Resource not found: The requested endpoint does not exist",
        500: "Server error: Please try again later",
        400: "Bad request: Invalid input or parameters",
        403: "Access denied: You do not have permission to perform this action",
        409: "Conflict: Data already exists or is in conflict",
      };

      errorMsg = errorMsg
        ? errorMsg
        : errorMessages[status]
        ? errorMessages[status]
        : "unexpected error";
      if (error) showMessage("error", errorMsg, null);

      return { error: errorMsg };
    }
  };

  return {
    fetchData,
  };
});
