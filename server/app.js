import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import { errorMiddleware } from "./middlewares/error.js";
import { connectDB } from "./utils/features.js";

import { NEW_MESSAGE } from "./constants/events.js";
import adminRoute from "./routes/admin.js";
import chatRoute from "./routes/chats.js";
import userRoute from "./routes/user.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";

dotenv.config({
    path:"./.env",
})

export const userSocketIDs = new Map();

const MongoURL= process.env.MONGO_URL;
connectDB(MongoURL);
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "abhay7199";

// createSingleChats(10);
// createGroupChats(10);

// createMessagesInAChat("673078f3dcf6bd47585b61b0",50)


const app = express();
const server = createServer(app)
const io = new Server(server,{})



app.use(express.json());
app.use(cookieParser());


app.use("/user",userRoute)
app.use("/chat",chatRoute)
app.use("/admin",adminRoute)

app.use(errorMiddleware)

io.on("connection",(socket)=>{
    const user ={
        _id:"dkjlnsv",
        name:"labdu"
    }
    userSocketIDs.set(user._id.toString(), socket.id)
    console.log("a user connected",socket.id);

    socket.on(NEW_MESSAGE,async({chatId, members , message})=>{
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString()
        };
        const messageForDB ={
            content: message,
            sender: user._id,
            chat: chatId
        };

        const usersSocket = getSockets(members);
        io.to(usersSocket).emit(NEW_MESSAGE,{
            chatId,
            message: messageForRealTime
        });
        io.to(usersSocket).emit(NEW_MESSAGE,{
            chatId
        });
        await Message.create(messageForDB);
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected")
        userSocketIDs.delete(user._id.toString());
    })
})
server.listen(3000,()=>{
    console.log(`Server is running at port 3000 in ${process.env.NODE_ENV} mode`);
})