import axios from "axios";
const url = import.meta.env.VITE_SERVER_URL;
export const uploadImage = async (formData) => {
  const response = await axios.post(`${url}/upload-image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
