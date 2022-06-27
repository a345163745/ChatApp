const express = require('express');
const app = express(); //create new express application for you
const http = require("http"); //need this to build server together with socketio
const cors = require("cors");
const {Server} = require("socket.io");
const router = require("./router")
app.use(cors());
app.use(router)
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
/*
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000", //where we get info from
        methods:["GET","POST"], //what method we accept
    }
})
*/
const io = Server(server);
app.use(cors());

io.on("connection",(socket)=>{
    console.log(`User Connected ${socket.id}`);
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User Room ${data}`)
    })
    socket.on("send_message",(data)=>{ //receive data from client
        socket.to(data.room).emit("receive_message",data) //send data to client
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id);
    })
})

server.listen(PORT,()=>{
    console.log("server running!");
})

