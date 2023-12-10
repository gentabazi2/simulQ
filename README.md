
# SimulQ: Real-time Collaborative Document Editing System

## Overview

SimulQ is a real-time collaborative editing platform, embodying extensive research into real-time document editing systems. This platform empowers users to collaboratively edit and interact with documents in real-time, enhancing productivity in individual and team settings.

Its purpose is to serve as a reference project on how a real-time collaborative editing system should be developed. This will help many others that want to start building something of their own in this way.
**Raise issues or contact me whenever you feel like there is something wrong, or want more detailed explanation on something in particular**

## Key Features

- **Real-time Document Editing:** Facilitates simultaneous document editing and collaboration among multiple users.
- **Cutting-edge Technologies:** Built with modern web development technologies and methodologies for optimal performance.
- **Scalable and Efficient:** Engineered to be intuitive, efficient, and scalable, accommodating a growing user base.

- **Authentication:** Via JWT, back to front with httpOnly Cookies, express middleware for verification. Normal Register and Login
- **Documents:** Rich text editor used: Quill.
  - ***Create:***
  -  ***Edit:***
  -  ***Add collaborators:*** Add collaborators via email.
  -  ***Online indicators:*** Indicators for when collaborators are online.
  -  ***Real-time editing:*** With the help of socket.io and quilljs-delta to break down the changes and sync every participant in the document together.
  -  ***Persistance and document life:*** Documents are stored in a mongoDb collection, but not every change directly goes in the database. To reduce the database communication, the usage of redis was necessary and it helped to optimize the solution in a beautiful manner (See for your self).

## Methodology

SimulQ's development process involved rigorous research and practical application, covering the following key areas:

### Secure User Authentication
- **JSON Web Tokens (JWT):** For secure claim representation between parties.
- **HTTP-Only Cookies:** Enhancing security against cross-site scripting attacks.

### Real-time Communication with Socket.IO
- **WebSocket Protocol:** Establishing a persistent two-way communication channel.
- **HTTP Protocol Integration:** Managing one-way communication requests efficiently.

### Frontend Development with React
- **React Hooks:** Simplifying state management and lifecycle features in functional components.
- **Axios Integration:** For performing efficient HTTP requests.

### High-Performance Caching with Redis
- **Efficient Data Storage:** Utilizing key-value data structures for rapid data retrieval and reduced database load.

### Middleware Configuration with Express.js
- **Extensive Middleware Support:** Facilitating request handling, authentication, error handling, and more.

### Backend Development with TypeScript
- **Enhanced Code Quality:** Introducing static typing to JavaScript, improving code reliability and maintenance.
- **Mongoose Schemas:** Demonstrating efficient MongoDB integration with Mongoose library.

## Objectives

The project aims to enhance collaborative work environments by addressing traditional document collaboration challenges, such as asynchronous communication and high database access loads.

## Challenges Addressed

SimulQ focuses on optimizing resource utilization, minimizing database access, and reducing message sizes for improved system performance and resource efficiency.

## Technologies

- **Backend:** Express.js, Node.js
- **Real-time Communication:** WebSocket, Socket.IO
- **Frontend:** React JS, TypeScript
- **Authentication:** JWT, HttpOnly Cookies
- **Database:** MongoDB, Mongoose
- **Caching:** Redis
- **HTTP Client:** Axios

## Future Scope

This project not only provides a robust system for real-time collaborative editing but also serves as a comprehensive guide for future developments in this field. The practices and methodologies used lay a solid foundation for building upon.

## Keywords

Real-time Collaboration, Document Editing, Web Technologies, WebSocket, Express.js, React, TypeScript, Redis, Axios, JWT, MongoDB.
