import express, { NextFunction } from "express";
import { forwardAuthenticated } from "../../../middleware/authentication.middleware";
import passport from "passport";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();

  constructor(private service: IAuthenticationService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, this.registration);
    this.router.get(`${this.path}/login`, forwardAuthenticated, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
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
    res.render("authentication/views/register", { error: null });
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
    console.log(req.body);
    try {
      const { email, password, firstName, lastName } = req.body;
      // creates username based on email address
      const username = email.split("@")[0];
      const userExists = await this.service.findUserByEmail(email);
      if (userExists) {
        throw new EmailAlreadyExistsException(email);
      }
      const user = await this.service.createUser({ username, email, password, firstName, lastName });
      // redirect to login page
      res.redirect("login");
    } catch (error) {
      next(error)
      console.error(error);
      // render the error to the user
      res.render("authentication/views/register", { error: error.message });
    }
  };

  //  // login user (can be swapped with redirect to login)
  //     req.login(user, (err) => {
  //       if (err) {
  //         next(err);
  //       } else {
  //         res.redirect("/posts");
  //       }
  //     });

  private logout = (req: express.Request, res: express.Response) => {
    req.logout((err: any) => {
      res.redirect("/");
    });
  };
}

export default AuthenticationController;
