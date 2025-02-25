import { IPost } from "@/entities";
import { IPostsRepository } from "@/infrastructure/repositories/interfaces";
import { NotFoundError } from "@neighbr/common";

export class PostsUseCase {
  constructor(private _postsRepository: IPostsRepository) {}
  async createPost(post: IPost): Promise<IPost> {
    return await this._postsRepository.createPost(post);
  }

  async getPosts(): Promise<IPost[]> {
    return await this._postsRepository.getPosts();
  }

  async getPostById(id: string): Promise<IPost | null> {
    return await this._postsRepository.getPostById(id);
  }

  async deletePost(id: string): Promise<boolean> {
    return await this._postsRepository.deletePost(id);
  }

  async updatePost(id: string, updatedPost: Partial<IPost>): Promise<IPost> {
    const post = await this._postsRepository.updatePost(id, updatedPost);
    if (!post) {
      throw new NotFoundError("Post not found");
    }
    return post;
  }
}
