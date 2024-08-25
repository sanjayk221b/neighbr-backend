import { Request, Response, NextFunction } from "express";
import { CommentsUseCase } from "@/use-cases/comments.use-case";
import { IComment } from "@/entities";
import { statusCodes } from "@neighbr/common";

export class CommentsController {
  private readonly _commentsUseCase: CommentsUseCase;

  constructor(commentsUseCase: CommentsUseCase) {
    this._commentsUseCase = commentsUseCase;
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const currentUser = req.currentUser;
      if (!currentUser) {
        return res
          .status(statusCodes.UNAUTHORIZED)
          .json({ success: false, message: "Unauthorized" });
      }

      const comment: IComment = {
        author: {
          id: currentUser.id,
        },
        post: req.params.postId,
        content: req.body.content,
      };

      const createdComment = await this._commentsUseCase.createComment(comment);
      return res.status(statusCodes.CREATED).json({
        success: true,
        message: "Comment created successfully",
        data: createdComment,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByPostId(req: Request, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      const comments = await this._commentsUseCase.getCommentsByPostId(postId);
      console.log(comments);
      return res.status(statusCodes.OK).json({
        success: true,
        message: "Comments fetched successfully",
        data: comments,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCommentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;
      const comment = await this._commentsUseCase.getCommentById(commentId);
      if (!comment) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: "Comment not found",
        });
      }
      return res.status(statusCodes.OK).json({
        success: true,
        message: "Comment fetched successfully",
        data: comment,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;
      const updatedComment: Partial<IComment> = {
        content: req.body.content,
      };

      const result = await this._commentsUseCase.updateComment(
        commentId,
        updatedComment
      );
      if (!result) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: "Comment not found",
        });
      }

      return res.status(statusCodes.OK).json({
        success: true,
        message: "Comment updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;
      const success = await this._commentsUseCase.deleteComment(commentId);
      if (!success) {
        return res.status(statusCodes.NOT_FOUND).json({
          success: false,
          message: "Comment not found",
        });
      }
      return res.status(statusCodes.NO_CONTENT).json({
        success: true,
        message: "Comment deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
