import { axiosInstance } from "./api.service";

export const updateUser = async (payload) => {
  const response = await axiosInstance.put(`/update-user`, payload);
  return response.data?.data;
};

export const sendOTP = async (payload) => {
  const response = await axiosInstance.post(`/send-otp`, payload);
  return response.data;
};

export const changePassword = async (payload) => {
  const response = await axiosInstance.post(
    `/verify-otp-and-change-password`,
    payload
  );
  return response.data?.data;
};
