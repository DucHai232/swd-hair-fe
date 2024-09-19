import { axiosInstance } from "./api.service";

export const login = async (data) => {
  try {
    const response = await axiosInstance.post(`/login`, data);
    return response;
  } catch (error) {
    console.log("Login in service/auth error : ", error);
    return error;
  }
};
