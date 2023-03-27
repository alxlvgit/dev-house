import express from "express";
import { forwardAuthenticated } from "../../../middleware/authentication.middleware";
import passport from "passport";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, forwardAuthenticated, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login());
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (req: express.Request, res: express.Response) => {
    const messages = (req.session as any).messages ? (req.session as any).messages : undefined;
    if (messages) {
      const latestMessage = messages[messages.length - 1];
      delete (req.session as any).messages;
      res.render("authentication/views/login", { errorMessage: latestMessage });
    }
    res.render("authentication/views/login", { errorMessage: null });
  };

  private showRegistrationPage = (_: express.Request, res: express.Response) => {
    res.render("authentication/views/register");
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = () => {
    return passport.authenticate("local", {
      failureRedirect: `${this.path}/login`,
      failureMessage: true,
      successRedirect: `/posts`
    });
  };

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => { };

  private logout = (req: express.Request, res: express.Response) => {
    req.logout((err: any) => console.log(err));
    res.redirect("/");
  };
}

export default AuthenticationController;
