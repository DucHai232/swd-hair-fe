import { axiosInstance } from "./api.service";

export const getVoucherUser = async () => {
  try {
    const response = await axiosInstance.get(`/get-voucher-user`);
    return response;
  } catch (error) {
    console.log("getVoucherUser in service/voucher error : ", error);
    throw error;
  }
};
