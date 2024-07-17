import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export class Cloudinary {
  async upload(file: Express.Multer.File) {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      return result.secure_url;
    } catch (err) {
      console.error("Error uploading image to Cloudinary:", err);
      throw new Error("Image upload failed");
    }
  }
}
