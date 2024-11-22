import axios from "axios";
const axiosApisInstance = axios.create({
  // baseURL: "/api",  // for deployment
  baseURL: "https://ofenup.waqarahmad.online/api", // local but hosted backend
  // baseURL: "http://localhost:4000/api",  // local and local backend
});

axiosApisInstance.interceptors.request.use(
  async (config) => {
    const token = await localStorage?.getItem("Authorization");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosApisInstance;
