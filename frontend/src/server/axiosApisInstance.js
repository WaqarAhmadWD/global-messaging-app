import axios from "axios";
const serverURL = import.meta.env.VITE_SERVER;

// "/api", // for deployment
// "https://ofenup.waqarahmad.online/api", // local but hosted backend
// "http://localhost:4000/api", // local and local backend

const axiosApisInstance = axios.create({
  baseURL: serverURL || "http://localhost:4000/api",
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
