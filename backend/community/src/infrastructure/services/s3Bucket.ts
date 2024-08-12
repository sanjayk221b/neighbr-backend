import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from "stream";
import crypto from "crypto";
import * as path from "path";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export default class S3Uploader {
  private _bucketName: string;
  private _bucketRegion: string;
  private _s3AccessKey: string;
  private _s3SecretAccessKey: string;
  private _s3Client: S3Client;

  constructor() {
    this._bucketName = process.env.BUCKET_NAME as string;
    this._bucketRegion = process.env.BUCKET_REGION as string;
    this._s3AccessKey = process.env.S3_ACCESS_KEY as string;
    this._s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string;
    this._s3Client = new S3Client({
      credentials: {
        accessKeyId: this._s3AccessKey,
        secretAccessKey: this._s3SecretAccessKey,
      },
      region: this._bucketRegion,
    });
  }

  private generateRandomImageName = (bytes = 32): string => {
    return crypto.randomBytes(bytes).toString("hex");
  };

  public uploadImagesToS3 = async (files: IFile[]): Promise<string[]> => {
    const uploadedImageNames: string[] = [];

    for (const file of files) {
      const stream = Readable.from(file.buffer);
      const imageName = this.generateRandomImageName();
      const uploader = new Upload({
        client: this._s3Client,
        params: {
          Bucket: this._bucketName,
          Key: imageName,
          Body: stream,
          ContentType: file.mimetype,
        },
      });

      try {
        await uploader.done();
        console.log(`${file.originalname} uploaded successfully`);
        uploadedImageNames.push(imageName);
      } catch (error) {
        console.error(`Error uploading ${file.originalname} to S3:`, error);
      }
    }

    return uploadedImageNames;
  };

  public getSignedImageUrls = async (
    imageNames: string[]
  ): Promise<string[]> => {
    const signedUrls: string[] = [];

    for (const imageName of imageNames) {
      const getObjectParams = {
        Bucket: this._bucketName,
        Key: imageName,
      };
      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(this._s3Client, command, {
        expiresIn: 3600,
      }); // Signed URL expires in 1 hour
      signedUrls.push(url);
    }

    return signedUrls;
  };

  private generateRandomFileName(originalName: string): string {
    const ext = path.extname(originalName);
    const randomName = crypto.randomBytes(32).toString("hex");
    return `${randomName}${ext}`;
  }

  public uploadFile = async (file: any, FileName: any): Promise<string> => {
    let buffer: Buffer;
    if (file.buffer instanceof ArrayBuffer) {
      buffer = Buffer.from(file.buffer);
    } else if (Buffer.isBuffer(file.buffer)) {
      buffer = file.buffer;
    } else {
      throw new Error("Invalid buffer type");
    }

    const stream = Readable.from(buffer);
    const fileName = this.generateRandomFileName(FileName);
    const uploader = new Upload({
      client: this._s3Client,
      params: {
        Bucket: this._bucketName,
        Key: fileName,
        Body: stream,
        ContentType: file.mimetype,
      },
    });

    try {
      await uploader.done();
      console.log(`${file.originalname} uploaded successfully as ${fileName}`);
      return fileName;
    } catch (error) {
      console.error(`Error uploading ${file.originalname} to S3:`, error);
      throw error;
    }
  };

  public retrieveFile = async (
    fileName: string,
    expiresIn: number = 3600
  ): Promise<string> => {
    const getObjectParams = {
      Bucket: this._bucketName,
      Key: fileName,
    };

    try {
      const command = new GetObjectCommand(getObjectParams);
      const signedUrl = await getSignedUrl(this._s3Client, command, {
        expiresIn,
      });
      return signedUrl;
    } catch (error) {
      console.error(`Error generating signed URL for file ${fileName}:`, error);
      throw error;
    }
  };
}
