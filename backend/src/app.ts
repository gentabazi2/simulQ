import express, {json, urlencoded, Express, Request, Response } from 'express';
import cors from 'cors';
import routes from "./loaders/routes";
import config from "./configs"
import { errorHandler } from "./handlers/errors/errorHandler"


const app: Express = express();
app.use(json());

app.use(urlencoded({ extended: true }));
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

//Allow CORS
app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.send({ response: "I am alive" }).status(200);
}); 

app.use(config.ENDPOINT_PREFIX, routes());

app.use(errorHandler);



export default app