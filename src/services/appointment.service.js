import { axiosInstance } from "./api.service";

export const createBookingAppointment = async (payload) => {
  try {
    const response = await axiosInstance.post(`/create-appointment`, payload);
    return response;
  } catch (error) {
    console.log("login in service/auth error : ", error);
    throw error;
  }
};
