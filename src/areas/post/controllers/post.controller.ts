import { Request, Response, NextFunction, Router } from "express";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { PostViewModel } from "../viewmodels/post.viewmodel";

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
    this.router.post(`${this.path}/:id/delete`, ensureAuthenticated, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, ensureAuthenticated, this.createComment);
    this.router.post(`${this.path}`, ensureAuthenticated, this.createPost);
  }

  private getAllPosts = async (req: Request, res: Response) => {
    // @ts-ignore
    const username = req.user.username;
    const posts = await this._postService.getAllPosts(username);
    const updatedPosts = posts.map((post) => {
      return new PostViewModel(post);
    });
    res.render("post/views/posts", { posts: updatedPosts, user: req.user });
  };

  private getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const post = await this._postService.findById(postId);
    const postVM = new PostViewModel(post);
    res.render("post/views/post", { post: postVM });
  };

  private deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    await this._postService.deletePost(postId);
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
    await this._postService.likeThePost((req.user as any).id, postId);
    await this.getAllPosts(req, res);
  };

  private createComment = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const userId = (req.user as any).id;
    const message = req.body.commentText;
    await this._postService.addCommentToPost(message, userId, postId);
    await this.getPostById(req, res, next);
  };
}

export default PostController;
