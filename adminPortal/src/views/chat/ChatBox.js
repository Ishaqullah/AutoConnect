import React, { useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import axios from 'axios';
const ChatBox = () => {
  
  return (
    <PageContainer title="ChatBox" description="this is ChatBox">
      <DashboardCard title="ChatBox">
      <div className='home'>
      <div className="container">
        
        <Sidebar/>
        <Chat/>
      </div>
      
    </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default ChatBox;
