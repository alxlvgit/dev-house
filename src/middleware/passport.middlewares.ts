import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // Use PassportConfig class here
};
