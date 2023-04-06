import IPost from "../../../interfaces/post.interface";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  addPost(post: IPost, username: string): void;

  sortPosts(posts: IPost[]): IPost[];

  getAllPosts(username: string): IPost[];

  findById(id: string): IPost | undefined;

  likeThePost(
    user_id: string, post_id: string
  )

  addCommentToPost(message: string, userId: string, postId: string): void;
}
