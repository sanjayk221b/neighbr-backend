import { Request, Response, NextFunction } from "express";
import { PostsUseCase } from "@/use-cases/posts.use-case";
import S3Uploader, { IFile } from "@/infrastructure/services/s3Bucket";
import {
  ResponseCreator,
  statusCodes,
  UnauthorizedError,
  NotFoundError,
} from "@neighbr/common";
import { ReportsUseCase } from "@/use-cases";

export class PostsController {
  private readonly _postsUseCase: PostsUseCase;
  private readonly _s3Uploader: S3Uploader;
  private readonly _reportsUseCase: ReportsUseCase;

  constructor(
    postsUseCase: PostsUseCase,
    s3Uploader: S3Uploader,
    reportsUseCase: ReportsUseCase
  ) {
    this._postsUseCase = postsUseCase;
    this._s3Uploader = s3Uploader;
    this._reportsUseCase = reportsUseCase;
  }

  async createPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const currentUser = req.currentUser;

      if (!currentUser) {
        throw new UnauthorizedError("Unauthorized");
      }

      const post: any = {
        author: {
          id: currentUser.id,
        },
        content: req.body.content,
        images: [],
      };

      if (req.files) {
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
      }

      const createdPost = await this._postsUseCase.createPost(post);

      if (createdPost.images && createdPost.images.length > 0) {
        const signedUrls = await this._s3Uploader.getSignedImageUrls(
          createdPost.images
        );
        createdPost.images = signedUrls;
      }

      const response = new ResponseCreator()
        .setData(createdPost)
        .setStatusCode(statusCodes.CREATED)
        .setMessage("Post created successfully");

      response.sendResponse(res);
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

      const response = new ResponseCreator()
        .setData(postsWithUrls)
        .setStatusCode(statusCodes.OK)
        .setMessage("Posts fetched successfully");

      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      const post = await this._postsUseCase.getPostById(postId);

      if (!post) {
        throw new NotFoundError("Post not found");
      }

      if (post.images && post.images.length > 0) {
        const signedUrls = await this._s3Uploader.getSignedImageUrls(
          post.images
        );
        post.images = signedUrls;
      }

      const postsWithUrls = [post];

      const response = new ResponseCreator()
        .setData(postsWithUrls)
        .setStatusCode(statusCodes.OK)
        .setMessage("Post fetched successfully");

      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async reportPost(req: Request, res: Response, next: NextFunction) {
    try {
      const currentUser = req.currentUser;

      if (!currentUser) {
        throw new UnauthorizedError("Unauthorized");
      }

      const { postId } = req.params;
      const { reason } = req.body;

      const report = {
        entityId: postId,
        entityType: "Post",
        reporterId: currentUser.id,
        postId: postId,
        reason,
      };

      const createdReport = await this._reportsUseCase.createReport(report);

      const response = new ResponseCreator()
        .setData(createdReport)
        .setStatusCode(statusCodes.CREATED)
        .setMessage("Post reported successfully");

      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async getReports(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = req.query;

      console.log(req.query);
      const reports = await this._reportsUseCase.getReports(
        Number(page),
        Number(limit)
      );

      const response = new ResponseCreator()
        .setData(reports)
        .setStatusCode(statusCodes.OK)
        .setMessage("Reports fetched successfully");

      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;

      const postDeleted = await this._postsUseCase.deletePost(postId);

      if (!postDeleted) {
        throw new NotFoundError("Post not found or could not be deleted");
      }

      const response = new ResponseCreator()
        .setStatusCode(statusCodes.OK)
        .setMessage("Post deleted successfully");

      response.sendResponse(res);
    } catch (error) {
      next(error);
    }
  }
}
