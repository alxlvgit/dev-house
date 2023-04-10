import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";

import {
  getUsernameByUserId,
  getLikesByPostId,
  getPostByPostId,
  getPostByUserId,
  getLikesByUserIdAndPostId,
} from "../../../areas/helpers/helpers";

export class MockPostService implements IPostService {
  _db: any;

  constructor(database: any) {
    this._db = database;
  }

  addPost(post: IPost, username: string): void {
    try {
      this._db.posts.push(post);
      for (let i = 0; i < this._db.users.length; i++) {
        if (this._db.users[i].username === username) {
          this._db.users[i].posts.push(post.id);
        }
      }
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  getAllPosts(username: string): IPost[] {
    try {
      let posts = [];

      for (const user of this._db.users) {
        if (username === user.username) {
          for (const post of user.posts) {
            if (getPostByUserId(user.id)) {
              posts.push({ ...getPostByPostId(post) });
            }
          }
          for (const following of user.following) {
            if (getPostByUserId(following)) {
              posts.push({ ...getPostByUserId(following) });
            }
          }
        } else {
          continue;
        }
        for (const post of posts) {
          const likes = getLikesByPostId(post.id);
          post.likes = likes;
        }
      }
      const finalPosts = posts.filter((post) => post.id);
      console.log(finalPosts);

      debugger;
      return this.sortPosts(finalPosts).filter((obj) => obj.id);
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  findById(post_id: string): IPost {
    try {
      const post = this._db.posts.find((post) => post.id == post_id);
      const clonedPost = { ...post };
      clonedPost.comments = post.comments.map((commentId) =>
        this._db.comments.find((comment) => comment.id == commentId)
      );
      return clonedPost;
    } catch {
      throw new Error("Method not implemented.");
    }
  }

  likeThePost = (user_id, post_id): void => {
    const likesFromTheUser = getLikesByUserIdAndPostId(user_id, post_id);
    console.log(likesFromTheUser, "likesFromTheUser");

    if (!likesFromTheUser) {
      this._db.likes.push({ user_id, postId: post_id });
      console.log("You have liked the post");
    } else {
      console.log("Removed like from the post");
      const likeIndex = this._db.likes.findIndex((like) => like.user_id === user_id && like.postId === post_id);
      this._db.likes.splice(likeIndex, 1);
    }
  };

  addCommentToPost(message: string, userId: string, postId: string): void {
    const maxId = Math.max(...this._db.comments.map((comment) => parseInt(comment.id)));
    const newId = (maxId + 1).toString();
    const username = this._db.users.find((user) => user.id == userId).username;
    const newComment = {
      id: newId,
      createdAt: new Date(),
      userId: userId,
      postId: postId,
      message: message,
      username: username,
    };
    this._db.comments.push(newComment);
    const post = this._db.posts.find((post) => post.id == postId);
    post.comments.push(newId);
  }

  sortPosts(posts: IPost[]): IPost[] {
    try {
      return posts.sort((a: any, b: any) => b.createdAt - a.createdAt);
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  deletePost(post_id: string): void {
    const posts = this._db.posts;
    const index = this._db.posts.findIndex((post) => post.id === post_id);
    if (index !== -1) {
      posts.splice(index, 1);
    }
  }
}
