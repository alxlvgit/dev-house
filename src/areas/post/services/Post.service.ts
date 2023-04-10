import { PrismaClient } from "@prisma/client";
import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import ILikes from "../../../interfaces/likes.interface";

export class PostService implements IPostService {
  _db: PrismaClient;

  constructor(database: any) {
    this._db = database;
  }

  async findUserByUsername(username: string): Promise<IUser> {
    const user = await this._db.user.findUnique({
      where: {
        username: username
      },
      include: {
        posts: true,
        following: true
      },
    });
    return user;
  }

  async addPost(post: IPost, username: string): Promise<IPost> {
    const newPost = await this._db.post.create({
      data: {
        message: post.message,
        user: {
          connect: { username: username }
        }
      }
    });
    return newPost;
  }

  async getPostsByUserId(userId: string): Promise<IPost[]> {
    const posts = await this._db.post.findMany({
      where: {
        userId: userId
      },
      include: {
        user: true,
        likes: true,
        comments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  }

  async getAllPosts(username: string): Promise<IPost[]> {
    let posts: IPost[] = [];
    const user = await this.findUserByUsername(username);
    const userPosts = await this.getPostsByUserId(user.id);
    for (const post of userPosts) {
      posts.push(post);
    }
    for (const following of user.following) {
      const followingPosts = await this.getPostsByUserId((following as any).id);
      for (const post of followingPosts) {
        posts.push(post);
      }
    }
    return posts;
  }


  async findById(post_id: string): Promise<IPost> {
    const post: IPost = await this._db.post.findUnique({
      where: {
        id: Number(post_id)
      },
      include: {
        user: true,
        likes: true,
        comments: true,
      },
    });
    return post;
  }


  async addCommentToPost(message: string, userId: string, postId: string): Promise<void> {
    const username = await this._db.user.findUnique({
      where: {
        id: Number(userId)
      }
    }).then((user) => user.username);
    const comment = await this._db.comment.create({
      data: {
        message: message,
        user: {
          connect: { id: Number(userId) }
        },
        post: {
          connect: { id: Number(postId) }
        }
      }
    });
    return { ...comment, username: username };
  }

  async getLikesByPostIdAndUserId(postId: string, userId: string): Promise<ILikes> {
    const post = await this.findById(postId);
    const like = (post.likes as any).find((like) => like.userId === Number(userId));
    return like;
  }

  async likeThePost(userId: string, postId): Promise<void> {
    const likeExists = await this.getLikesByPostIdAndUserId(postId, userId);
    if (likeExists) {
      await this._db.like.delete({
        where: {
          id: (likeExists as any).id
        }
      });
    } else {
      await this._db.like.create({
        data: {
          post: {
            connect: { id: Number(postId) }
          },
          user: {
            connect: { id: Number(userId) }
          }
        }
      });
    }
  }

  async deletePost(postId: string): Promise<void> {
    await this._db.comment.deleteMany({
      where: {
        postId: Number(postId)
      }
    });

    await this._db.like.deleteMany({
      where: {
        postId: Number(postId)
      }
    });

    await this._db.post.delete({
      where: {
        id: Number(postId)
      }
    });
  }

}
