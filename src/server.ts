import App from "./App";
import PostController from "./areas/post/controllers/post.controller";
import LandingController from "./areas/landing/controllers/Landing.controller";
import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
import { PostService, MockPostService } from "./areas/post/services";

const server = new App([
  new LandingController(),
  new PostController(new MockPostService()),
  new AuthenticationController(new MockAuthenticationService()),
]);

server.start();
