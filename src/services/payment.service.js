import { axiosInstance } from "./api.service";

export const paymentService = {
  createPayment: async (payload) => {
    const response = await axiosInstance.post(`/create-payment`, payload);
    return response.data;
  },
  checkOrderStatus: async (appTransId) => {
    const response = await axiosInstance.post(`/order-status/${appTransId}`);
    return response.data;
  },
  addVoucherAppointment: async (payload) => {
    const response = await axiosInstance.post(
      `/add-voucher-appointment`,
      payload
    );
    return response.data;
  },
};
