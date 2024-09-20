import { axiosInstance } from "./api.service";

export const login = async (data) => {
  try {
    const response = await axiosInstance.post(`/login`, data);
    if (response.data.access_token) {
      setTokenWithExpiry("access_token", response.data.access_token, 7);
    }

    return response;
  } catch (error) {
    console.log("Login in service/auth error : ", error);
    return error;
  }
};
