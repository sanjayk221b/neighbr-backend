import { IPost } from "@/entities";
import { IPostsRepository } from "@/infrastructure/repositories/interfaces";

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
}
