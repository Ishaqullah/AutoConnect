import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { Link,useParams } from "react-router-dom";

const Chat = () => {
    const { data } = useContext(ChatContext);
    const {id}=useParams();
   
    
    // Usage example:
    const roomId = data.chatId;
    console.log(roomId);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        {data.chatId!="null"?
        <div className="chatIcons">
           <Link to={`/Room/${roomId}/User/${id}`}><img src="/Images/cam.png" alt="" /></Link>
   
        </div>:""}
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;
