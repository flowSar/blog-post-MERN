import express, { type Request, type Response } from "express";
import { uploadMultiple, uploadSingle } from "../middleware/upload.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/image",
  uploadSingle,
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const imageUrl = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype
      );

      return res.json({
        message: "Image uploaded successfully",
        imageUrl,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        sucess: false,
        errors: {
          upload: `Upload failed`,
        },
      });
    }
  }
);

uploadRouter.post(
  "/images",
  uploadMultiple,
  async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const uploadedUrls: string[] = [];

      for (const file of files) {
        const url = await uploadToCloudinary(file.buffer, file.mimetype);
        uploadedUrls.push(url);
      }

      res.status(200).json({ images: uploadedUrls });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        sucess: false,
        errors: {
          upload: `Upload failed`,
        },
      });
    }
  }
);

export default uploadRouter;
