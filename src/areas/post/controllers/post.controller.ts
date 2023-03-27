import { Request, Response, NextFunction, Router } from "express";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { PostViewModel } from "../viewmodels/post.viewmodel";
// import { post, posts } from "../../../model/fakeDB";

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
    this.router.get(`${this.path}/:id`, this.getPostById);
    // this.router.get(`${this.path}/:id/delete`, this.deletePost);
    // this.router.post(`${this.path}/:id/comment`, this.createComment);
    // this.router.post(`${this.path}`, this.createPost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = (req: Request, res: Response) => {
    const posts = this._postService.getAllPosts("billgates");
    const updatedPosts = posts.map((post) => {
      delete post.userId;
      return post;
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

  // // 🚀 These post methods needs to be implemented by you
  // private createComment = async (req: Request, res: Response, next: NextFunction) => {};
  // private createPost = async (req: Request, res: Response, next: NextFunction) => {};
  // private deletePost = async (req: Request, res: Response, next: NextFunction) => {};
}

export default PostController;
