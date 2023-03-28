import { MockAuthenticationService } from "../areas/authentication/services/Authentication.service.mock";
import passport from "passport";
import PassportConfig, { LocalStrategyConfig } from "../areas/authentication/config/PassportConfig";


module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  const LocalStrategyConfiguration = new LocalStrategyConfig(new MockAuthenticationService());
  new PassportConfig(LocalStrategyConfiguration.getConfiguredStrategy());
};