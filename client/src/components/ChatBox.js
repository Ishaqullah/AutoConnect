import React, { useEffect, useState } from 'react';
import Sidebar from '../chat/Sidebar';
import Chat from '../chat/Chat';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './loader';
const ChatBox = ({ onValueChange }) => {
  const { id, sellerId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5278/users/getUser/${sellerId}`)
      .then(response => {
        setUser(response.data);
        setLoading(false); // Set loading to false once user data is received
        onValueChange(id);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [id, onValueChange, sellerId]);

  return (
    <>
      <div className='home'>
        <div className="container">
          {loading ? (
            <Loader/>
          ) : (
            // Render content once loading is false
            <>
              <Sidebar sellerName={user.userName} />
              <Chat />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatBox;
