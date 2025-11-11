import api from "./axiosInstance";

export const register = async (form: FormData) => {
  try {
    const res = await api.post("http://localhost:4444/auth/register", form);

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      errors: error.response.data.errors,
    };
  }
};

export const login = async (form: FormData) => {
  try {
    const response = await api.post("http://localhost:4444/auth/login", form);
    const { token } = response.data;
    localStorage.setItem("token", token);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, errors: error.response.data.errors };
  }
};
