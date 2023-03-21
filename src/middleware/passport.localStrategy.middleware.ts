import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PassportStrategy } from '../interfaces/passport.strategy.interface';
import { MockAuthenticationService } from "../areas/authentication/services/Authentication.service.mock";

const authService = new MockAuthenticationService;

const localStrategy = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    (email, password, done) => {
        try {
            const user = authService.getUserByEmailAndPassword(email, password);
            return done(null, user);
        } catch (error) {
            return done(null, false, { message: error.message });
        }
    }
);

passport.serializeUser(function (user: Express.User, done: ((error: any, email: string | undefined) => void)) {
    done(null, user.email);
});

passport.deserializeUser(function (email: string, done: ((error: any, user: Express.User | false | null) => void)) {
    try {
        const user = authService.findUserByEmail(email);
        return done(null, user);
    } catch (error) {
        return done(error.message, undefined);
    }
});

const passportLocalStrategy: PassportStrategy = {
    name: 'local',
    strategy: localStrategy,
};

export default passportLocalStrategy;