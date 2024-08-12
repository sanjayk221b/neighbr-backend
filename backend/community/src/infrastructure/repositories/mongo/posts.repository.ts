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
    const posts = await Post.find()
      .populate("author.id")
      .sort({ createdAt: -1 });
    console.log(posts);
    return posts;
  }
}
