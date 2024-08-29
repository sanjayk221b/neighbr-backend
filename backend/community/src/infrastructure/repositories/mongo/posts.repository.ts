import { IPostsRepository } from "@/infrastructure/repositories/interfaces";
import { IPost } from "@/entities";
import Post from "./models/post.model";

export class PostsRepository implements IPostsRepository {
  async createPost(post: IPost): Promise<IPost> {
    const newPost = new Post(post);
    const savedPost = await newPost.save();
    return await savedPost.populate("author.id");
  }

  async getPosts(): Promise<IPost[]> {
    const posts = await Post.find({ isDeleted: false })
      .populate("author.id")
      .sort({ createdAt: -1 });
    return posts;
  }

  async getPostById(id: string): Promise<IPost | null> {
    const post = await Post.findById(id).populate("author.id");
    return post;
  }

  async deletePost(id: string): Promise<boolean> {
    const result = await Post.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    return result !== null;
  }
}
