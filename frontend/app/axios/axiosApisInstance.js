import axios from "axios";
const axiosApisInstance = axios.create({
  baseURL: "/api",
  // baseURL: "https://ofenup.waqarahmad.online/api",
  // baseURL: "http://localhost:4000/api",
});

axiosApisInstance.interceptors.request.use(
  async (config) => {
    const token = await localStorage?.getItem("Authorization");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosApisInstance;
