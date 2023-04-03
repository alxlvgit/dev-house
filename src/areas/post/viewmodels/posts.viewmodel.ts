import IComment from "../../../interfaces/comment.interface";
import IPost from "../../../interfaces/post.interface";
import { database } from "../../../model/fakeDB";

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
    this.likes = this.getLikesByPostId(post.id);
    // this.commentList = post.comments;
  }

  public getUsernameByUserId(user_id): string {
    const users = database.users;
    for (const user of users) {
      if (user_id === user.id) {
        return user.firstName;
      }
    }
  }

  public getLikesByPostId = (post_id): string => {
    const likes = database.likes;
    const result = likes.filter((like) => like.post_id === post_id);
    return result.length.toString();
  };
}
