import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";
import localStrategy from "./passport.localStrategy.middleware";

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  const passportConfig = "initialize passport config with local strategy here";
};