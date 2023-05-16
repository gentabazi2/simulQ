import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.88.224:3001";
const socket = socketIOClient.connect(ENDPOINT);

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessage(data?.text));
  }, [socket, message]);

  const sendMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
    socket.emit("message", {
      text: e.target.value,
      name: localStorage.getItem("userName"),
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
  };
  return (
    <div className="App">
      <textarea
        type="text"
        id="main_text"
        placeholder="input text"
        style={{ width: "400px", height: "200px" }}
        value={message}
        onChange={(e) => sendMessage(e)}
      ></textarea>
    </div>
  );
}

export default App;
