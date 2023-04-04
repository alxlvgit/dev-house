import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { database } from "../../../model/fakeDB";

import { getUsernameByUserId, getLikesByPostId, getLikesByUserIdAndPostId } from "../../../areas/helpers/helpers";

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(post: IPost, username: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  private getPostByPostId(post_id): object {
    const posts = database.posts;
    for (const post of posts) {
      if (post.id === post_id) {
        return post;
      }
    }
  }

  private getPostByUserId(user_id): object {
    const posts = database.posts;
    for (const post of posts) {
      if (user_id === post.userId) {
        return post;
      }
    }
  }

  getAllPosts(userName: string): IPost[] {
    // 🚀 Implement this yourself.
    try {
      const loggedinUsername = userName;
      const users = database.users;
      let unsortedPostsArr = [];

      for (const user of users) {
        if (loggedinUsername === user.username) {
          for (const post of user.posts) {
            const userName = getUsernameByUserId(user.id);
            unsortedPostsArr.push({ ...this.getPostByPostId(post), username: userName });
          }
          for (const following of user.following) {
            const userName = getUsernameByUserId(following);
            unsortedPostsArr.push({ ...this.getPostByUserId(following), username: userName });
          }
        }
      }

      for (const post of unsortedPostsArr) {
        const likes = getLikesByPostId(post.id);
        post.likes = likes;
      }
      const sortedPostsArr = unsortedPostsArr.sort((a, b) => b.createdAt - a.createdAt);
      return sortedPostsArr;
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
      // 🚀 Implement this yourself.
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
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
}
