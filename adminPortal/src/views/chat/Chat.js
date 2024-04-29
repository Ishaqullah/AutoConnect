import React, { useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { ChatEngine } from 'react-chat-engine'
import axios from 'axios';
const Chat = () => {
  
  return (
    <PageContainer title="ChatBox" description="this is ChatBox">
      <DashboardCard title="ChatBox">
      <ChatEngine
      publicKey={'4d20f39b-c504-4897-b3ae-a1a6f00c2589'}
      userName={'Ishaq'}
      userSecret={'Ishaq'}
    />
      </DashboardCard>
    </PageContainer>
  );
};

export default Chat;
