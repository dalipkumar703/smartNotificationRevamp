import React from 'react';
import { List } from 'antd';
import { ListItem } from '../ListItem';

const UserMessage = ({ info }) => {
  const userMsgs = info.messageDetails;
  const participantDetails = info.participantDetails;
  console.log('participant', participantDetails);

  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'start', padding: '12px' }}
      >
        {' '}
        User message
      </div>
      <List
        bordered
        dataSource={userMsgs}
        style={{ backgroundColor: '#fff3cd' }}
        renderItem={(item, index) => <ListItem item={item}></ListItem>}
      />
    </div>
  );
};

export default UserMessage;
