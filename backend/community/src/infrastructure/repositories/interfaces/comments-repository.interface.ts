import { IComment } from "@/entities";

export interface ICommentsRepository {
  findByPostId(postId: string): Promise<IComment[]>;
  findById(commentId: string): Promise<IComment | null>;
  create(comment: IComment): Promise<IComment>;
  update(
    commentId: string,
    updatedComment: Partial<IComment>
  ): Promise<IComment | null>;
  delete(commentId: string): Promise<boolean>;
}
