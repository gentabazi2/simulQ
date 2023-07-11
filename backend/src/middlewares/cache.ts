import { NextFunction, Request, Response } from "express";
const client = require("../declarations/redis");

export default () => {
  return async (
    req: Request | any,
    res: Response | any,
    next: NextFunction
  ) => {
    const { document } = req.params;
    const key = document;

    client
      .get(key)
      .then((reply: any) => {
        if (reply) {
          res.send(JSON.parse(reply));
        } else {
          res.sendResponse = res.send;
          res.send = (body: any) => {
            client.set(key, body);
            res.sendResponse(body);
          };
          next();
        }
      })
      .catch((err: any) => {
        res.status(500).send(err);
      });
  };
};
