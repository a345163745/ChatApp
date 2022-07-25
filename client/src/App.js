import React,{useState} from "react"
import './App.css';
import io from "socket.io-client"
import Chat from "./component/Chat"
import {Button,TextField} from "@mui/material"
const socket = io.connect("http://localhost:3001");//use to connect from frontend to backend
function App() {
  const [username,setUsername] = useState("")
  const [room,setRoom] = useState("")
  const [checkJoin,setCheckJoin] = useState(false)
  const joinRoom = ()=>{
    if(username !== "" && room !== ""){
      socket.emit("join_room",room);
      setCheckJoin(true);
    }
  }
  return (
    <div className="App">
      { checkJoin ? <Chat socket={socket} username={username} room={room}/> :
      <div>
      <div className="home-header">
        <h3>Join a ChatRoom</h3>
        </div>
      <div className="home-input">
        <TextField id="standard-basic" label="Username" variant="standard" type="text" 
          placeholder="Name" onChange={e=>setUsername(e.target.value)}/>
        <TextField id="standard-basic" label="RoomID" variant="standard" type="text" 
          placeholder="Room ID" onChange={e=>setRoom(e.target.value)}/>
        <Button onClick={joinRoom} variant="contained">Join a Room</Button>
        </div>
        </div>
}
    </div>
  );
}

export default App;
