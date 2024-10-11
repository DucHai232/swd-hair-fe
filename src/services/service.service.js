import { axiosInstance } from "./api.service";

export const getServices = async () => {
  try {
    const response = await axiosInstance.get(`/view-service`);
    return response;
  } catch (error) {
    console.log("getServices in service/service error : ", error);
    throw error;
  }
};
