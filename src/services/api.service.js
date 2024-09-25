import axios from 'axios';
import axiosRetry from 'axios-retry';

// Axios instance setup
const url = import.meta.env.VITE_SERVER_URL;

export const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

// Retry logic
axiosRetry(axiosInstance, {
  retries: 5,
  retryDelay: (retryCount) => retryCount * 500,
  shouldResetTimeout: true,
  retryCondition: (error) => {
    if (!navigator.onLine) {
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
  },
});

// Set up interceptors
const setUpInterceptor = (store) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    async (config) => {
      const appState = await store.getState()
      const accessToken = await appState?.user?.accessToken;
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

};

export default setUpInterceptor;
