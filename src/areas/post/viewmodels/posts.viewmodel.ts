import IComment from "../../../interfaces/comment.interface";
import IPost from "../../../interfaces/post.interface";

export class PostsViewModel {
  public postId: string;
  public username: string;
  public createdAt: Date;
  public message: string;
  public comments: string;
  public likes: string;
  public commentList?: Array<IComment>;
  3;

  constructor(post: IPost) {
    this.postId = post.id;
    this.username = this.getUsernameByUserId(post.userId);
    this.createdAt = post.createdAt;
    this.message = post.message;
    this.comments = post.comments?.toString();
    this.likes = post.likes?.toString();
    // this.commentList = post.comments;
  }

  getUsernameByUserId(id): string {
    return "";
  }
}
