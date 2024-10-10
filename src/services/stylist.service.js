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
