import IPost from "../../../interfaces/post.interface";

export default interface IPostService {
  _db: any;

  addPost(post: IPost, username: string): void;

  sortPosts?(posts: IPost[]): IPost[];

  getAllPosts(username: string): IPost[] | Promise<IPost[]>;

  findById(id: string): IPost | Promise<IPost>;

  likeThePost(
    user_id: string, post_id: string
  )
  deletePost(postId: string): void;

  addCommentToPost(message: string, userId: string, postId: string): void;
}
