import App from "./App";
import PostController from "./areas/post/controllers/post.controller";
import LandingController from "./areas/landing/controllers/Landing.controller";
import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
import { PostService, MockPostService } from "./areas/post/services";
import { SearchController } from "./areas/search/controllers/Search.controller";
import { MockSearchService } from "./areas/search/services/Search.service.mock";
import { PrismaClient } from '@prisma/client';
import { AuthenticationService } from "./areas/authentication/services/Authentication.service";

const server = new App([
  new LandingController(),
  new PostController(new MockPostService()),
  new SearchController(new MockSearchService(new MockPostService())),
  new AuthenticationController(new AuthenticationService(new PrismaClient())),
]);

server.start();
