import { ICommentsRepository } from "../interfaces";
import { IComment } from "@/entities";
import Comment from "./models/comment.model";

export class CommentsRepository implements ICommentsRepository {
  async findByPostId(postId: string): Promise<IComment[]> {
    return Comment.find({ post: postId }).populate("author.id").exec();
  }

  async findById(commentId: string): Promise<IComment | null> {
    return Comment.findById(commentId).exec();
  }

  async create(comment: IComment): Promise<IComment> {
    const newComment = new Comment(comment);
    const savedComment = await newComment.save();
    return savedComment.populate("author.id");
  }

  async update(
    commentId: string,
    updatedComment: Partial<IComment>
  ): Promise<IComment | null> {
    return Comment.findByIdAndUpdate(commentId, updatedComment, {
      new: true,
    }).exec();
  }

  async delete(commentId: string): Promise<boolean> {
    const result = await Comment.findByIdAndDelete(commentId).exec();
    return result !== null;
  }
}
