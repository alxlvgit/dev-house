import passport from "passport";
import { PassportStrategy } from "../../../interfaces/passport.strategy.interface";
import { MockAuthenticationService } from "../services/Authentication.service.mock";
import { Strategy as LocalStrategy, Strategy } from "passport-local";

// Passport Configuration Class
export default class PassportConfig {
  private _strategies: PassportStrategy[];
  private _defaultStrategy: PassportStrategy;

  constructor() {
    this._strategies = [];
    this._defaultStrategy = new LocalStrategyConfig().getConfiguredStrategy();
    this.addStrategy(this._defaultStrategy);
  }

  private addAllStrategies(strategies: PassportStrategy[]): void {
    strategies.forEach((passportStrategy: PassportStrategy) => {
      passport.use(passportStrategy.name, passportStrategy.strategy);
    });
  }

  public addStrategy(strategy: PassportStrategy): void {
    this._strategies.push(strategy);
    this.addAllStrategies(this._strategies);
  }
}

// Local Strategy Configuration Class
class LocalStrategyConfig {
  private static _authService = new MockAuthenticationService();

  private configStrategy(): Strategy {
    return new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        try {
          const user = LocalStrategyConfig._authService.getUserByEmailAndPassword(email, password);
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
    passport.deserializeUser(function (email: string, done: (error: any, user: Express.User | false | null) => void) {
      try {
        const user = LocalStrategyConfig._authService.findUserByEmail(email);
        return done(null, user);
      } catch (error) {
        return done(error.message, undefined);
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
