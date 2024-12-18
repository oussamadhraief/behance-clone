import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiRequest = async (
  method,
  url,
  data = null,
  isFormData = false
) => {
  try {
    const config = {
      method,
      url: `${baseUrl}${url}`,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      withCredentials: true,
      data,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
