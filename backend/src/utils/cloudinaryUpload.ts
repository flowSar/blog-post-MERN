import { v2 as cloudinary } from "cloudinary";

import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// Helper function to upload a single file
export async function uploadToCloudinary(fileBuffer: Buffer, mimetype: string) {
  const base64 = `data:${mimetype};base64,${fileBuffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    folder: "blog_posts",
  });

  return result.secure_url; // URL of the uploaded image
}
