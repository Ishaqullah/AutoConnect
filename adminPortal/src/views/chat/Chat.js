import React, { useEffect,useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { ChatEngine } from 'react-chat-engine'
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Chat = () => {
  const [admin, setAdmin] = useState([]);
  const {id} = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5278/admins/${id}`)
      .then((response) => setAdmin(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []); 

  return (
    <PageContainer title="ChatBox" description="this is ChatBox">
      <DashboardCard title="ChatBox">
      <ChatEngine
      publicKey={'4d20f39b-c504-4897-b3ae-a1a6f00c2589'}
      userName={"Ishaq"}
      userSecret={"Ishaq"}
    />
      </DashboardCard>
    </PageContainer>
  );
};

export default Chat;
