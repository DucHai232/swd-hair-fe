import { axiosInstance } from "./api.service";

export const getAvailableTimeSlots = async (payload) => {
  try {
    const response = await axiosInstance.post(`/available-time-slots`, payload);
    return response;
  } catch (error) {
    console.log("getAvailableTimeSlots in service/schedule error : ", error);
    throw error;
  }
};
