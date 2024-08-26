import { IPost } from "@/entities";

export interface IPostsRepository {
  createPost(post: IPost): Promise<IPost>;
  getPosts(): Promise<IPost[]>;
  getPostById(id: string): Promise<IPost | null>;
  // updatePost(id: string, updatedPost: Partial<IPost>): Promise<IPost | null>;
  // deletePost(id: string): Promise<IPost | null>;
}
