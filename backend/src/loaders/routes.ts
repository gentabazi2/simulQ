import { Router } from "express";
import authRoute from "../routes/auth.routes";
import documentRoute from "../routes/document.routes";

const app = Router();

export default () => {
  app.use("/v1/auth", authRoute);
  app.use("/v1/document", documentRoute);
  return app;
};
