import passport, { DoneCallback } from "passport";
import { PassportStrategy } from "../../../interfaces/passport.strategy.interface";
import { Strategy as LocalStrategy, Strategy } from "passport-local";
import { IAuthenticationService } from '../services';
import IUser from '../../../interfaces/user.interface';

declare global {
  namespace Express {
    interface User extends IUser {
    }
  }
}

// Passport Configuration Class
export default class PassportConfig {
  constructor(strategies: PassportStrategy[]) {
    this.addStrategies(strategies);
  }

  private addStrategies(strategies: PassportStrategy[]): void {
    strategies.forEach((passportStrategy: PassportStrategy) => {
      passport.use(passportStrategy.name, passportStrategy.strategy);
    });
  }
}

// Local Strategy Configuration Class
export class LocalStrategyConfig {
  private static _authService: IAuthenticationService;

  constructor(authService: IAuthenticationService) {
    LocalStrategyConfig._authService = authService;
  }

  private configStrategy(): Strategy {
    return new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await LocalStrategyConfig._authService.getUserByEmailAndPassword(email, password);
          return done(null, user);
        } catch (error) {
          return done(null, false, { message: error.message });
        }
      }
    );
  }

  private serializeUser(): void {
    passport.serializeUser(function (user: Express.User, done: (error: any, email: string | undefined) => void) {
      done(null, (user as any).email);
    });
  }

  private deserializeUser(): void {
    passport.deserializeUser(async function (email: string, done: (error: any, user: Express.User | false | null) => void) {
      try {
        const user = await LocalStrategyConfig._authService.findUserByEmail(email);
        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    });
  }

  public getConfiguredStrategy(): PassportStrategy {
    const strategy = this.configStrategy();
    this.serializeUser();
    this.deserializeUser();
    return {
      name: "local",
      strategy: strategy,
    };
  }
}
