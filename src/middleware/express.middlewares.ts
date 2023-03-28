import express from "express";
import path from "path";
import morgan from "morgan";
import session, { MemoryStore } from "express-session";
import Redis from "ioredis";
import RedisStore from "connect-redis";

module.exports = (app) => {
  // Static File Serving and Post Body Parsing
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.set("views", path.join(__dirname, "..", "areas"));
  app.set("view engine", "ejs");

  // Logging Middleware
  app.use(morgan("tiny"));

  // Redis configuration
  const redisClient = new Redis({ host: `${process.env.REDIS_HOST}`, port: `${process.env.REDIS_PORT}`, password: `${process.env.REDIS_PASSWORD}` });

  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "session:"
  });

  // Session Configuration
  const NODE_ENV = `${process.env.NODE_ENV}`;
  const sessionStore = NODE_ENV === "production" ? redisStore : new MemoryStore();

  app.use(
    session({
      store: sessionStore,
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
};
