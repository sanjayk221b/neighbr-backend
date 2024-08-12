import { Request, Response, NextFunction } from "express";
import { PostsUseCase } from "@/use-cases/posts.use-case";
import { IPost } from "@/entities";
import S3Uploader, { IFile } from "@/infrastructure/services/s3Bucket";
import { statusCodes } from "@neighbr/common/dist/enums/statusCodes";

export class PostsController {
  private readonly _postsUseCase: PostsUseCase;
  private readonly _s3Uploader: S3Uploader;

  constructor(postsUseCase: PostsUseCase, s3Uploader: S3Uploader) {
    this._postsUseCase = postsUseCase;
    this._s3Uploader = s3Uploader;
  }

  async createPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const currentUser = req.currentUser;

      if (!currentUser) {
        return res
          .status(statusCodes.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }

      const post: any = {
        author: {
          id: currentUser.id,
        },
        content: req.body.content,
        images: [],
      };

      if (req.files) {
        console.log("Files to upload:", req.files);

        const filesToUpload: IFile[] = (req.files as Express.Multer.File[]).map(
          (file) => ({
            fieldname: file.fieldname,
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            buffer: file.buffer,
            size: file.size,
          })
        );

        const uploadedImageNames = await this._s3Uploader.uploadImagesToS3(
          filesToUpload
        );

        post.images = uploadedImageNames;
      } else {
        console.log("No files uploaded, creating text-only post.");
      }

      const createdPost = await this._postsUseCase.createPost(post);

      if (createdPost.images && createdPost.images.length > 0) {
        const signedUrls = await this._s3Uploader.getSignedImageUrls(
          createdPost.images
        );

        createdPost.images = signedUrls;
      }

      return res.status(statusCodes.CREATED).json(createdPost);
    } catch (error) {
      next(error);
    }
  }
  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await this._postsUseCase.getPosts();

      const imageNames = posts.flatMap((post) => post.images || []);

      const imageUrls = await this._s3Uploader.getSignedImageUrls(imageNames);

      const postsWithUrls = await Promise.all(
        posts.map(async (post) => {
          const postObject = post.toObject();
          postObject.images = (post.images || []).map((imageName) => {
            const url = imageUrls.find((url) => url.includes(imageName));
            return url || "";
          });
          return postObject;
        })
      );

      return res.status(statusCodes.OK).json(postsWithUrls);
    } catch (error) {
      next(error);
    }
  }
}
