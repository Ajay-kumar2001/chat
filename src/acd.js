// server.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
 socket.on("join_room", async (data: RoomConnection) => {
        const { error, value } = await roomConnectionSchema.validate(data);
        if (error) {
            throw new Error("Validation error: " + error.details[0].message);
        }
        const validatedData = value as RoomConnection
        const result = await createRoomConnection(validatedData)
        const roomId = result?.roomId as string
        socket.join(roomId);
        console.log(`User with ID: ${socket.id} joined room:${roomId} `);
    });

    socket.on("send_message", async (data: MessageData) => {
        const { error, value } = await messageDataSchema.validate(data);
        if (error) {
            throw new Error("Validation error: " + error.details[0].message);
        }
        const validatedData = value as MessageData

        const result = await chatDataBase.getConnection(validatedData)
        const roomId = result?.roomId as string
        socket.to(roomId).emit("receive_message", validatedData);
        await chatDataBase.saveMessageToDb(data, roomId)
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });  
 });



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
