import express from "express";
import { forwardAuthenticated } from "../../../middleware/authentication.middleware";
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

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.body)
    try {
      const { email, password, firstName, lastName } = req.body;
      const username = email.split("@")[0]
      const user = await this.service.createUser({ username, email, password, firstName, lastName });

      // render success message or redirect to login page
  //     res.redirect("login");
  //   } catch (error) {
  //     next(error);
  //   }
  //  };
      req.login(user, (err) => {
        if (err) {
          next(err);
        } else {
          res.redirect("/posts");
        }
      });
    } catch (error) {
      next(error);
    }
  };

  private logout = (req: express.Request, res: express.Response) => {
    req.logout((err: any) => console.log(err));
    res.redirect("/");
  };
}

export default AuthenticationController;
