import { Request, Response, NextFunction, Router } from "express";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { PostViewModel } from "../viewmodels/post.viewmodel";
import { database } from "../../../model/fakeDB";

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  private _postService: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this._postService = postService;
  }

  private initializeRoutes() {
    this.router.get(this.path, ensureAuthenticated, this.getAllPosts);
    this.router.get(`${this.path}/:id`, ensureAuthenticated, this.getPostById);
    this.router.get(`${this.path}/:id/like`, ensureAuthenticated, this.likePost);
    this.router.post(`${this.path}/:id/delete`, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = (req: Request, res: Response) => {
    // @ts-ignore
    const username = req.user.username;
    const posts = this._postService.getAllPosts(username);
    const updatedPosts = posts.map((post) => {
      return new PostViewModel(post);
    });
    res.render("post/views/posts", { posts: updatedPosts, user: req.user });
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;

    const post = this._postService.findById(postId);
    const postVM = new PostViewModel(post);
    res.render("post/views/post", { post: postVM });
  };

  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const posts = database.posts;
    const index = database.posts.findIndex((post) => post.id === postId);
    if (index !== -1) {
      posts.splice(index, 1);
    }
    res.redirect("/posts");
  };

  private createPost = async (req: Request, res: Response, next: NextFunction) => {
    debugger;
    const currentUser = req.user;
    // @ts-ignore
    const username = currentUser.username;
    // let newId = JSON.stringify(Math.max(...database.posts.map((post) => parseInt(post.id))) + 1);
    let newId = (Math.floor(Math.random() * 6000) + 1).toString();

    const post = {
      id: newId,
      message: req.body.postText,
      // @ts-ignore
      userId: currentUser.id,
      createdAt: new Date(),
      comments: [],
    };

    this._postService.addPost(post, username);
    res.redirect("/posts");
  };

  private likePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    this._postService.likeThePost(req.user.id, postId);
    console.log(database.likes);
    this.getAllPosts(req, res);
  }

  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const userId = req.user.id;
    const message = req.body.commentText;
    this._postService.addCommentToPost(message, userId, postId);
    this.getPostById(req, res, next);
  };
 
export default PostController;

