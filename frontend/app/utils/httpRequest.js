import axiosInstance from "./axiosInstance";

export default async function httpRequest({
  url = null,
  method = "GET", // Default method to GET
  data = null,
  type = "json",
}) {
  try {
    // Set default headers
    const headers = {
      "Content-Type":
        type === "form" ? "multipart/form-data" : "application/json",
    };

    // Create the config object
    const config = {
      headers,
      method: method.toUpperCase(),
      url: url,
    };

    // Append data for non-GET requests
    if (method !== "GET") {
      config.data = data;
    }

    // Make the API request using axios
    const response = await axiosInstance(config);

    // Return response data
    return response.data; // Assuming axios parses JSON automatically
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error; // Propagate the error for further handling
  }
}
