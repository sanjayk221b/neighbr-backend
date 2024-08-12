import { ICommentsRepository } from "@/infrastructure/repositories/interfaces";
import { IComment } from "@/entities";

export class CommentsUseCase {
  private readonly _commentsRepository: ICommentsRepository;

  constructor(commentsRepository: ICommentsRepository) {
    this._commentsRepository = commentsRepository;
  }

  async createComment(comment: IComment): Promise<IComment> {
    return this._commentsRepository.create(comment);
  }

  async getCommentsByPostId(postId: string): Promise<IComment[]> {
    return this._commentsRepository.findByPostId(postId);
  }

  async getCommentById(commentId: string): Promise<IComment | null> {
    return this._commentsRepository.findById(commentId);
  }

  async updateComment(
    commentId: string,
    updatedComment: Partial<IComment>
  ): Promise<IComment | null> {
    return this._commentsRepository.update(commentId, updatedComment);
  }

  async deleteComment(commentId: string): Promise<boolean> {
    return this._commentsRepository.delete(commentId);
  }
}
