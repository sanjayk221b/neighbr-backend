import multer, { FileFilterCallback, StorageEngine } from "multer";
import { Request } from "express";
import path from "path";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!") as unknown as null, false);
  }
};

const storage: StorageEngine = multer.diskStorage({
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
