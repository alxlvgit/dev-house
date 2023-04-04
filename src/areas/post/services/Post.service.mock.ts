import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { database } from "../../../model/fakeDB";
import {
  getUsernameByUserId,
  getLikesByPostId,
  getPostByPostId,
  getPostByUserId,
  getLikesByUserIdAndPostId
} from "../../../areas/helpers/helpers";

export class MockPostService implements IPostService {
  addPost(post: IPost, username: string): void {
    try {
      database.posts.push(post);
      for (let i = 0; i < database.users.length; i++) {
        if (database.users[i].username === username) {
          database.users[i].posts.push(post.id);
        }
      }
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  getAllPosts(username: string): IPost[] {
    try {
      let posts = [];

      for (const user of database.users) {
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
        }
        for (const post of posts) {
          const likes = getLikesByPostId(post.id);
          post.likes = likes;
        }
      }
      // hack to fix delete issue for now
      return this.sortPosts(posts).filter((obj) => obj.id);
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  findById(post_id: string): IPost {
    try {
      const post = database.posts.find((post) => post.id == post_id);
      const clonedPost = { ...post };
      clonedPost.comments = post.comments.map((commentId) =>
        database.comments.find((comment) => comment.id == commentId)
      );
      return clonedPost;
    } catch {
      throw new Error("Method not implemented.");
    }
  }


  likeThePost = (user_id, post_id): void => {
    const likesFromTheUser = getLikesByUserIdAndPostId(user_id, post_id);
    if (!likesFromTheUser) {
      database.likes.push({ user_id, post_id });
      console.log("You have liked the post");
    } else {
      console.log("Removed like from the post");
      const likeIndex = database.likes.findIndex((like) => like.user_id === user_id && like.post_id === post_id);
      database.likes.splice(likeIndex, 1);
    }
  }

  addCommentToPost(message: string, userId: string, postId: string): void {
    const maxId = Math.max(...database.comments.map(comment => parseInt(comment.id)));
    const newId = (maxId + 1).toString();
    const username = database.users.find(user => user.id == userId).username;
    const newComment = {
      id: newId,
      createdAt: new Date(),
      userId: userId,
      postId: postId,
      message: message,
      username: username
    }
    database.comments.push(newComment);
    const post = database.posts.find(post => post.id == postId);
    post.comments.push(newId);
  }

  sortPosts(posts: IPost[]): IPost[] {
    try {
      return posts.sort((a: any, b: any) => b.createdAt - a.createdAt);
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}
