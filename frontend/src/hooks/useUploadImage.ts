import axios from "axios";
import { useState } from "react";

export const useUploadImage = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoding] = useState(false);
  const uploadImag = async (file: File) => {
    setError("");

    try {
      setLoding(true);
      const formData = new FormData();
      formData.append("profileImg", file);

      const { data } = await axios.post(
        "http://localhost:4444/upload/image",

        formData
      );

      return data;
    } catch (error: any) {
      console.log("erro: ", error);
      setError(() => error.response.data.errors.upload || "Upload failed");
      throw error;
    } finally {
      setLoding(false);
    }
  };

  return { uploadImag, loading, error };
};
