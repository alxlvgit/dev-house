import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { database } from "../../../model/fakeDB";
import {
  getUsernameByUserId,
  getLikesByPostId,
  getPostByPostId,
  getPostByUserId,
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
              posts.
              push({ ...getPostByPostId(post) });
            }
            for (const following of user.following) {
              const userName = getUsernameByUserId(following);
              if (getPostByUserId(following)) {
                posts.push({ ...getPostByUserId(following) });
              }
            }
          }
        }

        for (const post of posts) {
          const likes = getLikesByPostId(post.id);
          post.likes = likes;
        }

        // hack to fix delete issue for now
        return this.sortPosts(posts).filter((obj) => obj.id);
      }
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

  sortPosts(posts: IPost[]): IPost[] {
    try {
      return posts.sort((a: any, b: any) => b.createdAt - a.createdAt);
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  //NOT DONE 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
}
