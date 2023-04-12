import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import fs from "fs";

const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
  const message = error.message || "An error has occurred";
  const errorInfo = `${new Date().toLocaleString("en-US", { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true })} - ${status} - ${message}\n`;
  fs.appendFile("error.log", errorInfo, (err) => {
    if (err) {
      console.error(err);
    }
  });
  console.log("error logged");
};

export default errorMiddleware;
