import api from "./axiosInstance";

export const createPost = async (form: FormData) => {
  try {
    const response = await api.post("http://localhost:4444/posts", form);
    const { post } = response.data;
    return { success: true, post };
  } catch (error: any) {
    console.log("create post failed: ", error.response.data);
    return { success: false, errors: error.response.data.errors };
  }
};

export const getAllPosts = async () => {
  try {
    const response = await api.get("http://localhost:4444/posts");
    // const { posts } = response.data;
    // return { success: true, posts };
    const { data, message } = response.data;
    console.log(response.data);

    return { success: true, posts: data, message };
  } catch (error: any) {
    console.log("loading posts failed: ", error.response.data);
    return { success: false, errors: error.response.data };
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const response = await api.get(
      `http://localhost:4444/users/${userId}/posts`
    );
    // const { posts } = response.data;

    // return { success: true, posts };
    const { data, message } = response.data;

    return { success: true, posts: data, message };
  } catch (error: any) {
    return { success: false, error: error.response.data.message };
  }
};

export const deletePost = async (id: string) => {
  try {
    const response = await api.delete(`http://localhost:4444/posts/${id}`);
    const { success } = response.data;
    return { success };
  } catch (error: any) {
    console.log("date: ", error.response.data);
    return { success: false, message: error.response.data.message };
  }
};

export const updatePost = async (id: string, form: FormData) => {
  try {
    const response = await api.put(`http://localhost:4444/posts/${id}`, form);
    const { success, data, message } = response.data;
    return { success, data, message };
  } catch (error: any) {
    console.log("update post error: ", error);
    return {
      success: false,
      errors: error.response.data.errors,
      message: error.response.data.message,
    };
  }
};
