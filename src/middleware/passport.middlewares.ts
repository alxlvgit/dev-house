import { MockAuthenticationService } from "../areas/authentication/services/Authentication.service.mock";
import passport from "passport";
import PassportConfig, { LocalStrategyConfig } from "../areas/authentication/config/PassportConfig";
import { AuthenticationService } from "../areas/authentication/services/Authentication.service";
import { PrismaClient } from "@prisma/client";


module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  const localStrategyConfiguration = new LocalStrategyConfig(new AuthenticationService(new PrismaClient()));
  const localStrategyConfigured = localStrategyConfiguration.getConfiguredStrategy();
  new PassportConfig([localStrategyConfigured]);
};