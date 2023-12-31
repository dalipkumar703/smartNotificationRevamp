import React from 'react';
import { List } from 'antd';
import { ListItem } from '../ListItem';
const NotificationMessages = ({ info, showFilterNot }) => {
  const notificationsMsgs = info.notificationDetails;
  const filterNotMsgs = info.filterNotifications;
  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'start', padding: '12px' }}
      >
        Notification message
      </div>{' '}
      {!showFilterNot && (
        <List
          bordered
          style={{
            boxShadow: 'saddlebrown 2px 2px 5px',
            backgroundColor: '#fff3cd',
          }}
          dataSource={notificationsMsgs}
          renderItem={(item) => <ListItem item={item}></ListItem>}
        />
      )}
      {showFilterNot && (
        <List
          bordered
          style={{
            boxShadow: 'saddlebrown 2px 2px 5px',
            backgroundColor: '#fff3cd',
          }}
          dataSource={filterNotMsgs}
          renderItem={(item) => <ListItem item={item}></ListItem>}
        />
      )}
    </div>
  );
};

export default NotificationMessages;
