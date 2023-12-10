import express, { json, urlencoded, Express, Request, Response } from "express";
import cors from "cors";
import routes from "./loaders/routes";
import config from "./configs";
import { errorHandler } from "./handlers/errors/errorHandler";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";

const app: Express = express();
app.use(json({ limit: "25mb" }));
app.use(urlencoded({ extended: true, limit: "25mb" }));
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//Allow CORS
app.use(cors(corsOptions));

app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send({ response: "I am alive" }).status(200);
});

app.use(config.ENDPOINT_PREFIX, routes());
app.use(methodOverride());
app.use(errorHandler);

export default app;
