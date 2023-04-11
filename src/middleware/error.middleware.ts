import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import fs from "fs";

const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
<<<<<<< HEAD
  // const status = error.status || 500;
  // const message = error.message || "An error has occurred";
  // const errorInfo = `${new Date().toLocaleString("en-US", { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true })} - ${status} - ${message}\n`;
  // fs.appendFile("error.log", errorInfo, (err) => {
  //   if (err) {
  //     console.error(err);
  //   }
  // });
  // console.log("error logged");
=======
  const status = error.status || 500;
  const message = error.message || "An error has occured";
  console.log(status, message);
>>>>>>> 9b6a3343e2b5904736c6e7a1798b5d363719f38e
};

export default errorMiddleware;
