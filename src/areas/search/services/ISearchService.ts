import IPost from "../../../interfaces/post.interface";

export default interface ISearchService {
    searchPosts(username: string, searchTerm: string): IPost[];
    // enhancePostSearchResults(posts: IPost[]): IPost[];
}