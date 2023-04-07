import express, { NextFunction } from "express";
import { ensureAuthenticated, forwardAuthenticated } from "../../../middleware/authentication.middleware";
import passport from "passport";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();

  constructor(private service: IAuthenticationService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, forwardAuthenticated, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, forwardAuthenticated, this.registration);
    this.router.get(`${this.path}/login`, forwardAuthenticated, this.showLoginPage);
    this.router.post(`${this.path}/login`, forwardAuthenticated, this.login);
    this.router.get(`${this.path}/logout`, ensureAuthenticated, this.logout);
  }

  private showLoginPage = (req: express.Request, res: express.Response) => {
    const messages = (req.session as any).messages ? (req.session as any).messages : undefined;
    if (messages) {
      const latestMessage = messages[messages.length - 1];
      delete (req.session as any).messages;
      res.render("authentication/views/login", { errorMessage: latestMessage });
    } else {
      res.render("authentication/views/login", { errorMessage: null });
    }
  };

  private showRegistrationPage = (req: express.Request, res: express.Response) => {
    const messages = (req.session as any).messages ? (req.session as any).messages : undefined;
    if (messages) {
      const latestMessage = messages[messages.length - 1];
      delete (req.session as any).messages;
      res.render("authentication/views/register", { error: latestMessage });
    } else {
      res.render("authentication/views/register", { error: null });
    }
  };

  private login = async (req: express.Request, res: express.Response) => {
    const authenticated = await passport.authenticate("local", {
      failureRedirect: `${this.path}/login`,
      failureMessage: true,
      successRedirect: `/posts`,
    });
    return authenticated(req, res);
  };

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      if (password.length < 8) {
        throw new Error("Password should be at least 8 characters long");
      }
      // creates username based on email address
      const username = email.split("@")[0];
      await this.service.createUser({ username, email, password, firstName, lastName });
      this.login(req, res);
    } catch (error) {
      next(error);
      (req.session as any).messages = [error.message];
      // render the error to the user
      res.redirect(`${this.path}/register`);
    }
  };

  private logout = (req: express.Request, res: express.Response) => {
    req.logout((err: any) => {
      res.redirect("/auth/login");
    });
  };
}

export default AuthenticationController;
