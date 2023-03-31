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
    }

    private getSearchResults = (req: Request, res: Response) => {
        const foundPosts = this._searchService.searchPosts(`${req.query.search}`, req.user.username);
        if (foundPosts) {
            res.render("search/views/search", { posts: foundPosts, user: req.user });
        } else {
            res.redirect("/posts");
        }
    };
}


