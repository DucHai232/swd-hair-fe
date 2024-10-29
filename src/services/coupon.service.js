import { axiosInstance } from "./api.service";

export const applyCoupon = async (payload) => {
  try {
    const response = await axiosInstance.post(`/apply-coupon`, payload);
    return response;
  } catch (error) {
    console.log("applyCoupon in service/coupon error : ", error);
    throw error;
  }
};
