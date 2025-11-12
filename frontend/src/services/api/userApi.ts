import api from "./axiosInstance";

export const getAllUsers = async () => {
  try {
    const response = await api.get("http://localhost:4444/users");
    const { success, data, message } = response.data;
    return { success, data, message };
  } catch (error: any) {
    console.log("error retreiving user");
    return { success: false, message: error.response.data.message };
  }
};
