import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:4000/api",
  withCredentials: true,
});
// Use this function to get the token only in the browser
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("Authorization");
  }
  return null; // No token on the server
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken(); // Get token here
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
