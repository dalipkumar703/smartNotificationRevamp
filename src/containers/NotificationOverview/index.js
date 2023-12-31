import React from 'react';
import './index.scss';
import { Button, List } from 'antd';
import { metricsApi } from '../../utils/domfunctions';
const NotificationOverview = ({ info, emails = [], setEmails }) => {
  const connection = info['connection']?.value;
  const messages = info['messages']?.value;
  const notification = info['notification']?.value;

  const handleSendMail = () => {
    metricsApi('send_mail_all');
    chrome.storage.local.get(['emails']).then((res) => {
      const emails = res.emails.join(';');
      window.open(`https://mail.google.com/mail/u/0/?fs=1&tf=cm&bcc=${emails}`);
    });
  };
  const handleClean = () => {
    metricsApi('clean_all');
    chrome.storage.local.set({ emails: [] });
    setEmails([]);
  };
  return (
    <>
      <div className="notification-overview">
        <div>Connection: {connection}</div>
        <div>Messages: {messages}</div>
        <div>Notifications: {notification}</div>
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'start',
            padding: '12px',
            flexDirection: 'column',
          }}
        >
          <p>Saved Company/Candidates emails</p>
          <div>
            <Button
              style={{ backgroundColor: '#FFFF00' }}
              onClick={handleClean}
            >
              Clean All
            </Button>
            <Button
              style={{ backgroundColor: '#FFFF00' }}
              onClick={handleSendMail}
            >
              Send Mail to All
            </Button>
          </div>
        </div>

        <List
          bordered
          style={{
            boxShadow: 'saddlebrown 2px 2px 5px',
            backgroundColor: '#fff3cd',
          }}
          dataSource={emails}
          renderItem={(item, index) => (
            <List.Item>
              {item} {}
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default NotificationOverview;
