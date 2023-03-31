import IPost from "../../../interfaces/post.interface";
import IPostService from "../../../areas/post/services/IPostService";
import ISearchService from "./ISearchService";
import { getFnameLnameByUserId } from "../../../areas/helpers/helpers";


export class MockSearchService implements ISearchService {
    private _postService: IPostService;

    constructor(postService: IPostService) {
        this._postService = postService;
    }

    searchPosts(searchTerm: string, username: string): IPost[] {
        const allPosts = this._postService.getAllPosts(username);
        const postsSearchResult = allPosts.filter(post => (post.message.toUpperCase()).includes(searchTerm.toUpperCase()));
        return postsSearchResult.length > 0 ? this.enhancePostSearchResults(postsSearchResult) : null;
    }

    private enhancePostSearchResults = (posts: IPost[]): IPost[] => {
        return posts.map(post => {
            const { fname, lname } = getFnameLnameByUserId(post.userId);
            return { ...post, fname, lname };
        });
    }
}