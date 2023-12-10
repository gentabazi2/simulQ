import { Socket } from "socket.io";
import * as service from "./services/document.service";
import Delta from "quill-delta";
const client = require("./declarations/redis");
const ws = (io: any) => {
  io.on("connection", (socket: Socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("connection-authorization", async (user: any) => {});
    socket.on("joinRoom", async ({ documentId, userId }) => {
      let roomId = documentId;
      socket.join(roomId);
      let room = io.sockets.adapter.rooms.get(roomId);
      io.to(socket.id).emit("joinedRoom", []);
      socket.to(roomId).emit("newUserJoined", { room, userId });
      client
        .get(documentId)
        .then((reply: any) => {
          if (reply) {
            const doc = JSON.parse(reply);
            if (doc.onlineCollaborators) {
              doc.onlineCollaborators.push(userId);
            } else {
              doc.onlineCollaborators = [userId];
            }

            client.set(documentId, JSON.stringify(doc));
          }
        })
        .catch((error: any) => {});
      socket.on("leaveRoom", () => {});
      socket.on("send-changes", (delta: any) => {
        socket.broadcast.to(roomId).emit("receive-changes", delta);
        client.get(documentId).then((reply: any) => {
          if (reply) {
            let doc = JSON.parse(reply);
            const d = new Delta(delta);
            let fullDoc = null;
            fullDoc = doc;
            const docData = new Delta(fullDoc!.data[0]!.document_data);
            const restored = docData.compose(d);
            let dataArr = [...fullDoc.data];
            let documentInfo = { ...dataArr[0] };
            documentInfo.document_data = restored;
            dataArr[0] = documentInfo;
            fullDoc.data = dataArr;
            client.set(documentId, JSON.stringify(fullDoc));
          }
        });
      });
      socket.on("disconnect", () => {
        socket.to(roomId).emit("leavingRoom", userId);
        const room = io.sockets.adapter.rooms.get(roomId);
        client
          .get(documentId)
          .then(async (reply: any) => {
            if (reply) {
              let doc = JSON.parse(reply);
              if (doc.onlineCollaborators) {
                let index = doc.onlineCollaborators.findIndex(userId);
                if (index > -1) {
                  let arr = [...doc.onlineCollaborators];
                  arr.splice(index, 1);
                  doc.onlineCollaborators = arr;
                  client.set(documentId, JSON.stringify(doc));
                }
              }
              await service.saveDocument(
                "",
                documentId,
                "1",
                doc?.data[0].document_data
              );
            }
          })
          .catch((error: any) => {});
        if (!room) {
          client.del(documentId, (err: any, response: any) => {
            if (response == 1) {
            } else {
            }
          });
        }
      });
    });

    socket.on("error", () => {
      console.log("error");
    });
    socket.on("reconnect", () => {
      console.log("reconnect");
    });
  });
};

export default ws;
