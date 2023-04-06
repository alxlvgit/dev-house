import { Request, Response, Router } from "express";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import IController from "../../../interfaces/controller.interface";
import ISearchService from "../services/ISearchService";



export class SearchController implements IController {
    public path = "/search";
    public router = Router();
    private _searchService: ISearchService;

    constructor(searchService: ISearchService) {
        this.initializeRoutes();
        this._searchService = searchService;
    }

    private initializeRoutes() {
        this.router.get(this.path, ensureAuthenticated, this.getSearchResults);
        this.router.get(`${this.path}/:user_id/follow`, ensureAuthenticated, this.followUnfollowTheUser);
    }

    private getSearchResults = (req: Request, res: Response) => {
        const foundPosts = this._searchService.searchPosts(`${req.query.search}`, (req.user as any).username);
        const foundUsers = this._searchService.searchUsers(`${req.query.search}`, (req.user as any).username);
        if (foundPosts || foundUsers) {
            res.render("search/views/search", { posts: foundPosts, users: foundUsers });
        } else {
            res.redirect("/posts");
        }
    };

    private followUnfollowTheUser = (req: Request, res: Response) => {
        this._searchService.followUnfollowTheUser(req.params.user_id, (req.user as any).username);
        res.redirect("back");
    }
}


