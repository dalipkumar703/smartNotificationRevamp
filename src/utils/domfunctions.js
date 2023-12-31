export const notificationUpdates = () => {
  console.log('inside notification updates');
  const data = document.querySelectorAll('.notification-badge--show');
  const notificationList = {
    connection: {},
    messages: {},
    notification: {},
    messageDetails: [],
    notificationDetails: [],
    filterNotifications: [],
    participantDetails: [],
  };
  data.forEach((notificationItem) => {
    const identifyNode = notificationItem.children[1];
    if (identifyNode.innerHTML.includes('network')) {
      notificationList.connection.value =
        notificationItem.children[0]?.innerText;
    }
    if (identifyNode.innerHTML.includes('message')) {
      notificationList.messages.value = notificationItem.children[0]?.innerText;
    }
    if (identifyNode.innerHTML.includes('new notifications')) {
      notificationList.notification.value =
        notificationItem.children[0]?.innerText;
    }
  });

  //get notifications details
  const notificationsResult = document.querySelectorAll('.nt-card');
  console.log('notifi', notificationsResult);
  notificationsResult.forEach((notificationItem) => {
    notificationList.notificationDetails.push(notificationItem?.innerText);
  });
  //get message details
  const messagesWrapper = document.querySelectorAll(
    '.msg-overlay-list-bubble__convo-card-container'
  );
  messagesWrapper.forEach((messageItem) => {
    const messageDetail = messageItem.querySelectorAll(
      '.msg-overlay-list-bubble__message-snippet--v2'
    );
    const participantName = messageItem.querySelectorAll(
      '.msg-conversation-listitem__participant-names'
    );
    // messageDetails.forEach((notificationItem) => {
    //   notificationList.messageDetails.push(notificationItem.innerText);
    // });
    console.log('mess', messageDetail);
    console.log('parr', participantName);
    messageDetail[0] &&
      notificationList.messageDetails.push(messageDetail[0]?.innerText);
    participantName[0] &&
      notificationList.participantDetails.push(participantName[0]?.innerText);
  });
  const messageDetails = document.querySelectorAll(
    '.msg-conversation-listitem__participant-names'
  );
  // const messageConversation = document.getElementsByClassName('msg-overlay-list-bubble__message-snippet--v2')
  console.log('notifi', messageDetails);
  // messageDetails.forEach((notificationItem) => {
  //   notificationList.messageDetails.push(notificationItem.innerText);
  // });

  // get filter notifications
  notificationsResult.forEach((item) => {
    console.log('item', item);
    if (
      item.children &&
      (item.children[0]?.children[0].ariaLabel?.includes('profile') ||
        item.children[0]?.children[1]?.ariaLabel?.includes('profile'))
    ) {
      console.log('true');
      notificationList.filterNotifications.push(item?.innerText);
    }
  });
  // const messagesResult = getMessagesName()
  // const notificationsResult = getNotificationName()
  // notificationList.messageDetails = document.querySelectorAll('.msg-conversation-listitem__participant-names');
  // notificationList.notificationDetails = ;
  console.log('ok', notificationList);
  return notificationList;
};

export const metricsApi = (type) => {
  try {
    fetch(
      'https://ap-south-1.aws.data.mongodb-api.com/app/data-zkcsl/endpoint/data/v1/action/insertOne',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key':
            'WkQ8Fva7hvhq26wLSK3hkYP0Pu2oOC9dCgP0vMDVg6fNeq7488Vd7U5jjiHbGvIu',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          collection: 'metrics',
          database: 'prodIntel',
          dataSource: 'Cluster0',
          document: {
            action: type,
            time: new Date(),
          },
        }),
      }
    );
  } catch (error) {
    console.error(`api error: ${error}`);
  }
};
