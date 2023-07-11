import dotenv from 'dotenv';
dotenv.config();
import mongoose, { mongo } from 'mongoose';
import config from "./src/configs/index"
import http from "http"
const socketIo = require("socket.io");


mongoose.connection.once('open', () => {
    console.log('MongoDB Connected.');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB Connection Error: ' + err.message);
  });
  mongoose.connect(config.DATABASE,{
    dbName:"simulQ"
  } )


  import './src/loaders/models';
  import app from './src/app';
  import ws from "./src/ws";
    
  const server = http.createServer(app);

  const io = socketIo(server,  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  ws(io);
 
  server.listen(config.PORT || 80, () => {
    console.log('Server Listening on: ' + config.PORT);
  });
  