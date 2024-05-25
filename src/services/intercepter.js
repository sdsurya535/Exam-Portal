import axios from "axios";
import authService from "./auth";
import BaseUrl from "../api/BaseUrl";

const axiosInstance = axios.create({
  baseURL: BaseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
