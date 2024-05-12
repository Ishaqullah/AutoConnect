import React,{useEffect} from 'react'
import Sidebar from '../chat/Sidebar'
import Chat from '../chat/Chat'
import {useParams} from 'react-router-dom'
import { Session, Chatbox } from "@talkjs/react";

const ChatBox = ({onValueChange}) => {
    const { id } = useParams();
    useEffect(() => {
      onValueChange(id);
    }, [id, onValueChange]);
  return (
    <>
    <div className='home'>
      <div className="container">
        
        <Sidebar/>
        <Chat/>
      </div>
      
    </div>
    
    </>
  )
}

export default ChatBox