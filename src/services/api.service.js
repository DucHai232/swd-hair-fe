import axios from "axios";
import axiosRetry from "axios-retry";
import { setOnLineStatus } from "../feature/app";

const url = import.meta.env.VITE_SERVER_URL;

export const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

axiosRetry(axiosInstance, {
  retries: 5,
  retryDelay: retryCount => {
    return retryCount * 500;
  },
  shouldResetTimeout: true,
  retryCondition: error => {
    if (!navigator.onLine) {
      dispatchEvent(setOnLineStatus(false))
      return false;
    }

    const status = Number(error?.response?.status);
    if (status === 503) {
      return false;
    }

    return (
      (status >= 100 && status <= 199) ||
      (status >= 500 && status <= 599) ||
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      status === 429 ||
      status === 408 ||
      status === 400
    );
  }
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
