import axios from "axios";
const url = import.meta.env.VITE_SERVER_URL;

export const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    avc: "123",
  },
  responseType: "json",
});

api.interceptors.request.use(
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
