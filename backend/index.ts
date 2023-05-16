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
  
  const server = http.createServer(app);

  const io = socketIo(server,  {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });


  const getApiAndEmit = (socket:any) => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
  };

  io.on("connection", (socket:any) => {
    console.log(`⚡: ${socket.id} user just connected!`);
   
    socket.on('message', (data:any) => {
      console.log("data", data.text);
      io.emit('messageResponse', data);
    });

    socket.on("disconnect", () => {
      console.log('🔥: A user disconnected');
    });
  });

  server.listen(config.PORT || 80, () => {
    console.log('Server Listening on: ' + config.PORT);
  });
  