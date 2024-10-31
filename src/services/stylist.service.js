import { axiosInstance } from "./api.service";

export const getStylists = async () => {
  try {
    const response = await axiosInstance.post(`/get-user-role`, {
      roleSymbol: "ST",
    });
    return response;
  } catch (error) {
    console.log("login in service/auth error : ", error);
    throw error;
  }
};

export const getAllStylists = async () => {
  try {
    const response = await axiosInstance.get(`/get-all-stylists`);
    return response.data;
  } catch (error) {
    console.log("Error in service/auth: ", error);
    throw error;
  }
};
