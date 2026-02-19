import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 3000 });

type PeerT = Record<string, WebSocket>;
const rooms: Map<string, PeerT> = new Map();
wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");
  let userId: undefined | string;

  ws.on("message", (message: string) => {
    const data = JSON.parse(message);

    if (data.type == "create-room") {

      rooms.set(data.roomId, {});
      ws.send(
        JSON.stringify({
          type: "join-success",
          roomId: data.roomId,
        })
      );
    } else if (data.type == "join-room") {

      if (rooms.has(data.roomId)) {
        const room = rooms.get(data.roomId);
        
        if (room) {
          if (Object.keys(room).length == 2) {


            ws.send(
              JSON.stringify({
                type: "join-error",
                errorMessage: "Room is full. Cannot join more than 2 users.",
              })
            );

          } else {
            ws.send(
              JSON.stringify({
                type: "join-success",
                roomId: data.roomId,
              })
            );
          }
        }
      } else {
        ws.send(
          JSON.stringify({
            type: "join-error",
            errorMessage: "Room not found.",
          })
        );
      }
    } else if (data.type === "add-me") {
      if (!rooms.has(data.roomId)) {
        ws.send(
          JSON.stringify({
            type: "join-error",
            errorMessage: "Room not found.",
          })
        );
      } else {
        const room = rooms.get(data.roomId);

          if (room![data.userId]) {
            delete room![data.userId];
          }
        if (Object.keys(room!).length >= 2) {
          ws.send(
            JSON.stringify({
              type: "join-error",
              errorMessage: "Room is full. Cannot join more than 2 users.",
            })
          );
        } else {
          // if (room![data.userId]) {
          //   delete room![data.userId];
          // }
          userId = data.userId;
          room![data.userId] = ws;

          const updatedIds = Object.keys(room!);


          if (updatedIds.length === 2) {
            updatedIds.forEach((id) => {
const otherId = updatedIds.find((x) => x !== id)!;
              room![id].send(JSON.stringify({
                type: "ready",
                peerId: otherId
              }));
            });
          }


        }
      }

    
    } else if (data.type === "leave-room") {
      if(rooms.has(data.roomId)) {


        const room = rooms.get(data.roomId);
        if (room![data.userId]) {
          delete room![data.userId];
        }
      }
    } 
    else if (["offer", "answer", "ice-candidate","file-details","transfer-start","transfer-stop"].includes(data.type)) {
      rooms.get(data.roomId)![data.to].send(JSON.stringify({ ...data, to: userId }));
    }

  
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    if (userId) {
      const roomEntry = Array.from(rooms.entries()).find(([_, room]) => room[userId!]);
      if (roomEntry) {
      const [roomId, room] = roomEntry;
      if (Object.keys(room).length === 0) {
        rooms.delete(roomId);
      }
      }
    }
   
  });
});
