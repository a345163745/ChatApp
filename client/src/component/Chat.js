import React,{useState,useEffect} from "react"
import {Button,TextField} from "@mui/material"
import ScrollToBottom from "react-scroll-to-bottom"
export default function Chat({socket,username,room}){
    const [currentMessages,setCurrentMessages] = useState("");
    const [messageList,setMessageList] = useState([]);

    const sendMessages = async ()=>{
        if(currentMessages!==""){
            const messageData={
                username:username,
                room:room,
                message:currentMessages,
                time:new Date(Date.now()).getHours() +
                ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message",messageData)
            setMessageList((e)=>[...e,messageData])
            setCurrentMessages("")
        }
    }
    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            setMessageList((e)=> [...e,data])
        })
    },[socket])

    return(
        <div className="chat-box">
            <div className="chat-header">
                Welcome User: {username} !
                </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                 {messageList.map(item=>(

                    <div className="message-box" id={username===item.username ? "you" : "other"}>
                        <p className="message-time">{item.time}</p>
                        <div className="message-username">
                            <h3>{item.username}:</h3>
                        </div>
                        
                            <h4 className="message">{item.message}</h4>
                        
                 </div>

            ))}
            </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <TextField type="text" placeholder="enter message" value={currentMessages} onChange={e=>{setCurrentMessages(e.target.value)}}
                onKeyPress={(e)=>{e.key==="Enter" && sendMessages()}} 
                id="standard-basic" label="Message..." variant="standard" size="small"/>
            
                <Button onClick={sendMessages} variant="outlined" size="large">Send</Button>
            </div>
        </div>
    )
}