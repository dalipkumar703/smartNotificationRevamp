const setDOMInfo = (info) => {
  const setEmailsInDom = () => {};
  console.log('item', info);
  // chrome.action.setBadgeText(
  //   {
  //     text: '5',
  //   },
  // )
  chrome.storage.local
    .set({ info: info })
    .then(() => {
      console.log('value set');
    })
    .catch((error) => {
      console.log('eror in value', error);
    });

  const newDiv = document.createElement('div');
  newDiv.class =
    'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white';
  newDiv.style.display = 'flex';
  newDiv.style.justifyContent = 'space-between';
  newDiv.style.paddingBottom = '13px';
  info &&
    ['connection', 'messages', 'notification'].forEach((item) => {
      const newContent = document.createElement('div');
      const text = document.createTextNode(`${item}: ${info[item].value || 0}`);
      newContent.appendChild(text);
      newDiv.appendChild(newContent);
      const br = document.createElement('br');
      newDiv.appendChild(br);
    });
  const currentDiv = document.getElementById('linkedin');
  const parent = document.getElementById('container');
  const notificationDetailDiv = document.getElementById(
    'notifications-details'
  );

  const messageDetailDiv = document.getElementById('messages-details');

  const notificationDDiv = document.createElement('div');
  const messageDDiv = document.createElement('div');

  info &&
    info.notificationDetails.map((notificationItem, index) => {
      const newContent = document.createElement('div');
      newContent.style.boxShadow = '2px 2px 5px saddlebrown';
      newContent.style.borderRadius = '10px';
      newContent.style.marginBottom = '-19px';
      newContent.classList.add('notification-list-item');
      newContent.classList.add('list-group-item');
      newContent.classList.add('list-group-item-warning');
      newContent.classList.add(`item-${index}`);
      newContent.style.color = 'black';
      let isBigNotification = false;
      let isMoreText;
      if (notificationItem?.length > 150) {
        isBigNotification = true;
        isMoreText = document.createElement('div');
        isMoreText.classList.add(`item-${index}`);
        isMoreText.addEventListener('click', (event, notificationItem) => {
          console.log('ii', event);
          const readMoreClass = event.target.className;
          let clickedElemHide = document.getElementsByClassName(
            `list-group-item-warning item-${index}`
          )[0];
          let showElement = document.getElementsByClassName(
            `list-group-item-warning item-${index} hide`
          )[0];
          showElement.style.display = 'block';
          clickedElemHide.style.display = 'none';
          console.log('notifi', notificationItem);
          //  clickedElem?.innerText = notificationItem
          isMoreText.innerText = 'read less';
          isMoreText.style.display = 'none';
        });
        const textRead = document.createTextNode('Read more');
        if (textReadMore) {
          textRead.style.position = 'absolute';
          textRead.style.right = '29px';
        }

        isMoreText.appendChild(textRead);
      }
      const text = document.createTextNode(
        `${notificationItem.substr(0, 150)}`
      );

      newContent.appendChild(text);
      notificationDDiv.appendChild(newContent);
      if (isBigNotification) {
        notificationDDiv.appendChild(isMoreText);
      }
      const br = document.createElement('br');
      br.classList.add('notification-list-item');

      notificationDDiv.appendChild(br);
      // full text notification
      const newContentFull = document.createElement('div');
      newContentFull.style.boxShadow = '2px 2px 5px saddlebrown';
      newContentFull.style.borderRadius = '10px';
      newContentFull.style.marginBottom = '-19px';
      newContentFull.style.display = 'none';
      newContentFull.classList.add('notification-list-item');
      newContentFull.classList.add('list-group-item');
      newContentFull.classList.add('list-group-item-warning');
      newContentFull.classList.add(`item-${index}`);
      newContentFull.classList.add(`hide`);
      newContentFull.style.color = 'black';

      const textFull = document.createTextNode(`${notificationItem}`);

      newContentFull.appendChild(textFull);
      notificationDDiv.appendChild(newContentFull);
      const brFull = document.createElement('br');
      br.classList.add('notification-list-item');

      notificationDDiv.appendChild(brFull);
    });

  info &&
    info.messageDetails.map((messageItem) => {
      const newContent = document.createElement('div');
      newContent.classList.add('list-group-item');
      newContent.classList.add('list-group-item-warning');
      newContent.style.color = 'black';
      newContent.style.marginBottom = '8px';
      newContent.style.borderRadius = '4px';
      const text = document.createTextNode(`${messageItem}`);
      newContent.appendChild(text);
      messageDDiv.appendChild(newContent);
      const br = document.createElement('br');
      // messageDDiv.appendChild(br)
    });
  parent.insertBefore(newDiv, currentDiv.nextSibling);
  notificationDetailDiv.appendChild(notificationDDiv);
  messageDetailDiv.appendChild(messageDDiv);
  // setEmailsInDom()
  // const emailDiv = document.getElementById('emails')
  // console.log("emailllllllllldvi",emailDiv)
  //set email in dom
  const EmailsDiv = document.createElement('div');
  EmailsDiv.classList.add('list-group');
  chrome.storage.local.get(['emails']).then((res) => {
    console.log('Emails', res.emails);
    res.emails?.map((email) => {
      const newContent = document.createElement('div');
      newContent.classList.add('list-group-item');
      newContent.classList.add('list-group-item-warning');
      newContent.classList.add('email-list-item');
      newContent.style.color = 'black';
      newContent.style.marginBottom = '7px';
      const text = document.createTextNode(`${email}`);
      newContent.appendChild(text);
      EmailsDiv.appendChild(newContent);
      const br = document.createElement('br');
      br.classList.add('email-list-item');
    });
  });
  console.log('emails render', EmailsDiv);
  const EmailsParentDiv = document.getElementById('emails');
  console.log('div emaild', EmailsParentDiv);
  EmailsParentDiv && EmailsParentDiv.appendChild(EmailsDiv);
};

const getMessagesName = () => {
  return document.getElementsByClassName(
    'msg-conversation-listitem__participant-names'
  );
};
const getNotificationName = () => {
  return document.getElementsByClassName('nt-card');
};
let emailInterval;

// const emailSetFromFeed = () => {
//     const data = document.getElementsByClassName('feed-shared-update-v2')
//     console.log("data",data)
//     for (let feed of data){
//       const email = feed.querySelectorAll('span[dir=ltr]')[1].innerText.split(' ').filter((item)=>item.includes('@'))
//       console.log("email",email)
//       chrome.storage.local.set({ emails: [email]})
//     }

// }
const executeScriptsaveOpenJobsEmail = () => {
  const setEmailsInDom = () => {
    const EmailsDiv = document.createElement('div');
    EmailsDiv.classList.add('list-group');
    chrome.storage.local.get(['emails']).then((res) => {
      res.emails?.map((email) => {
        const newContent = document.createElement('div');
        newContent.classList.add('email-list-item');
        newContent.classList.add('list-group-item');
        newContent.classList.add('list-group-item-warning');
        newContent.style.color = 'black';
        const text = document.createTextNode(`${email}`);
        newContent.appendChild(text);
        EmailsDiv.appendChild(newContent);
        const br = document.createElement('br');
        br.classList.add('email-list-item');
      });
    });
    console.log('emails render', EmailsDiv);
    const EmailsParentDiv = document.getElementById('emails');
    console.log('div emaild', EmailsParentDiv);
    // EmailsDiv.appendChild(br)
    EmailsParentDiv && EmailsParentDiv.appendChild(EmailsDiv);
  };
  const parseEmail = (email) => {
    if (!email || email.length === 0) {
      return '';
    }
    const parser = [' ', '\n', '-', ':'];
    let res = '';
    parser.map((parseItem) => {
      const splitArr = (res || email || '')?.split(parseItem);
      splitArr.map((splitItem) => {
        if (splitItem.includes('@')) {
          res = splitItem;
        }
      });
    });
    return res;
  };
  //getting each feed
  const data = document.getElementsByClassName('feed-shared-update-v2');
  chrome.storage.local.get(['emails']).then((res) => {
    let emails = res.emails || [];
    for (let feed of data) {
      feed.querySelector('.feed-shared-control-menu__trigger').click();
      document
        .getElementsByClassName('option-share-via')[0]
        .querySelector('.tap-target')
        .click();
      const postLink = document.getElementsByClassName(
        'artdeco-toast-item__cta'
      )[0].href;
      const email = feed
        .querySelectorAll('span[dir=ltr]')[1]
        ?.innerText.split(' ')
        ?.filter((item) => item.includes('@'));
      const parsedEmail = parseEmail(email && email[0]);
      console.log('email', parsedEmail);
      console.log('postLink', postLink);
      if (parsedEmail) {
        // chrome.storage.local.get(['emails']).then(res=>{
        console.log('emails', res);
        console.log('parseEMail', parsedEmail);
        const isExist = emails?.filter((item) => item === parsedEmail);
        if (!isExist?.length) {
          // chrome.storage.local.set({ emails: [...res.emails, parsedEmail]})
          emails.push(parsedEmail);
        }
        // })
      }
    }
    console.log('emails', emails);
    chrome.storage.local.set({ emails: emails });
  });

  //loop scroll in interval
  const newDate = new Date();

  chrome.storage.local.get(['timeToScroll']).then((res) => {
    const scrollTime = res.timeToScroll;
    emailInterval = setInterval(() => {
      const minuteDiff = Math.abs(newDate - new Date()) / 36e5;

      if (minuteDiff > 0.016 * parseInt(scrollTime)) {
        console.log('1 min over');
        clearInterval(emailInterval);
        // setEmailsInDom()
      }
      window.scrollBy(600, 600);
      const data = document.getElementsByClassName('feed-shared-update-v2');
      chrome.storage.local.get(['emails']).then((res) => {
        let emails = res.emails || [];
        for (let feed of data) {
          const email = feed
            .querySelectorAll('span[dir=ltr]')[1]
            .innerText.split(' ')
            .filter((item) => item.includes('@'));
          const parsedEmail = parseEmail(email && email[0]);
          if (parsedEmail) {
            // chrome.storage.local.get(['emails']).then(res=>{
            console.log('emails', res);
            console.log('parseEMail', parsedEmail);
            const isExist = emails?.filter((item) => item === parsedEmail);
            if (!isExist?.length) {
              // chrome.storage.local.set({ emails: [...res.emails, parsedEmail]})
              emails.push(parsedEmail);
            }
            // })
          }
        }
        console.log('emails', emails);
        chrome.storage.local.set({ emails: emails });
      });
    }, 2000);
    return 6;
  });

  // chrome.storage.local.get(['emails']).then(res=>{
  //   return res.emails
  // })
};
const saveOpenJobsEmail = () => {
  //
  const setEmailsInDom = () => {
    const EmailsDiv = document.createElement('div');
    EmailsDiv.classList.add('list-group');
    chrome.storage.local.get(['emails']).then((res) => {
      res.emails?.map((email) => {
        const newContent = document.createElement('div');
        newContent.classList.add('list-group-item');
        newContent.classList.add('list-group-item-warning');
        newContent.style.color = 'black';
        newContent.classList.add('email-list-item');
        const text = document.createTextNode(`${email}`);
        newContent.appendChild(text);
        EmailsDiv.appendChild(newContent);
        const br = document.createElement('br');
        br.classList.add('email-list-item');
      });
    });
    console.log('emails render', EmailsDiv);
    const EmailsParentDiv = document.getElementById('emails');
    console.log('div emaild', EmailsParentDiv);
    EmailsParentDiv && EmailsParentDiv.appendChild(EmailsDiv);
  };
  chrome.storage.local.get(['tabId']).then((result) => {
    chrome.scripting
      .executeScript({
        target: { tabId: result.tabId },
        func: executeScriptsaveOpenJobsEmail,
      })
      .then((result) => {
        console.log('injected a function 1', result);
        setEmailsInDom(result.emails);
      });
  });
};
const notificationUpdates = () => {
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
    notificationList.notificationDetails.push(notificationItem.innerText);
  });
  //get message details
  const messageDetails = document.querySelectorAll(
    '.msg-conversation-listitem__participant-names'
  );
  console.log('notifi', messageDetails);
  messageDetails.forEach((notificationItem) => {
    notificationList.messageDetails.push(notificationItem.innerText);
  });

  // get filter notifications
  notificationsResult.forEach((item) => {
    console.log('item', item);
    if (
      item.children &&
      (item.children[0]?.children[0].ariaLabel?.includes('profile') ||
        item.children[0]?.children[1]?.ariaLabel?.includes('profile'))
    ) {
      console.log('true');
      notificationList.filterNotifications.push(item.innerText);
    }
  });
  // const messagesResult = getMessagesName()
  // const notificationsResult = getNotificationName()
  // notificationList.messageDetails = document.querySelectorAll('.msg-conversation-listitem__participant-names');
  // notificationList.notificationDetails = ;
  console.log('ok', notificationList);
  return notificationList;
};
chrome.tabs.query(
  {
    currentWindow: true,
  },
  (tabs) => {
    // ...and send a request for the DOM info...
    tabs.forEach((tabEach, index) => {
      // let tabInfo = await chrome.tabs.get(tabEach.id);

      console.log('info', tabEach);
      try {
        if (tabEach.url.includes('linkedin')) {
          chrome.storage.local.set({ tabId: tabEach.id });
          chrome.scripting
            .executeScript({
              target: { tabId: tabEach.id },
              func: notificationUpdates,
            })
            .then((result) => {
              console.log('injected a function', result);
              setDOMInfo(result[0].result);
            });
        }
      } catch (error) {
        console.log('err', error);
      }

      window.addEventListener('DOMContentLoaded', () => {
        // ...query for the active tab...
        // chrome.storage.local.set({ emails: []})
        console.log('page');
        // chrome.tabs.sendMessage(
        //   tabEach.id,
        //   {from: 'popup', tabs},
        //   // ...also specifying a callback to be called
        //   //    from the receiving end (content script).
        //   function (response){
        //     if (!chrome.runtime.lastError) {
        //       // if you have any response
        //       setDOMInfo(response)
        //   } else {
        //       // if you don't have any response it's ok but you should actually handle
        //       // it and we are doing this when we are examining chrome.runtime.lastError
        //   }

        //   });
        // try {
        //   const page = await chrome.runtime.getBackgroundPage()
        //   console.log("page",page)
        // } catch (error){
        //   console.log('err',error)
        // }
      });
    });
  }
);

const settings = document.getElementsByClassName('settings');
console.log('settings', settings);
settings[0]?.addEventListener('click', () => {
  const newDiv = document.createElement('div');
  const newContent = document.createElement('div');
  const newContent1 = document.createElement('div');
  newContent1.style.display = 'flex';
  // add checkbox for save open jobs email
  const isExistRadio = document.getElementsByClassName('radio-select');
  if (!isExistRadio[0]) {
    newDiv.classList.add('radio-select');
    const text = document.createTextNode('select notification by user only');
    const textJobEmail = document.createTextNode(
      'Save company/candidates emails'
    );
    const x = document.createElement('INPUT');
    x.setAttribute('type', 'checkbox');
    x.setAttribute('id', 'radio-notification');
    x?.addEventListener('click', (event) => {
      console.log('event', event.target.checked);
      const timetoScroll = document.getElementById('time-to-scroll').value;
      chrome.storage.local.set({ timeToScroll: timetoScroll || 1 });
      // listener call
      //saveOpenJobsEmail
      if (event.target.checked) {
        chrome.storage.local.get(['info']).then((result) => {
          const filterNotifications = result.info.filterNotifications;

          document
            .querySelectorAll('.notification-list-item')
            .forEach((el) => el.remove());
          const notificationDDiv = document.createElement('div');
          console.log('filter', filterNotifications);
          filterNotifications &&
            filterNotifications.map((notificationItem) => {
              console.log('inside filter', notificationItem);
              // limit length
              const newContent = document.createElement('div');
              // newContent.classList.add("notification-list-item")
              newContent.style.boxShadow = '2px 2px 5px saddlebrown';
              newContent.style.borderRadius = '10px';
              newContent.style.marginBottom = '-19px';
              newContent.classList.add('notification-list-item');
              newContent.classList.add('list-group-item');
              newContent.classList.add('list-group-item-warning');
              newContent.style.color = 'black';
              const text = document.createTextNode(
                `${notificationItem.substr(0, 150)}`
              );
              newContent.appendChild(text);
              notificationDDiv.appendChild(newContent);
              const br = document.createElement('br');

              br.classList.add('notification-list-item');
              // full length notification
              const newContentFull = document.createElement('div');
              // newContent.classList.add("notification-list-item")
              newContentFull.style.boxShadow = '2px 2px 5px saddlebrown';
              newContentFull.style.borderRadius = '10px';
              newContentFull.style.marginBottom = '-19px';
              newContentFull.classList.add('notification-list-item');
              newContentFull.classList.add('list-group-item');
              newContentFull.classList.add('list-group-item-warning');
              newContentFull.style.color = 'black';
              const textFull = document.createTextNode(
                `${notificationItem.substr(0, 150)}`
              );
              newContent.appendChild(text);
              notificationDDiv.appendChild(newContentFull);
              const brFull = document.createElement('br');

              brFull.classList.add('notification-list-item');
              notificationDDiv.appendChild(br);
            });
          const notificationDetailDiv = document.getElementById(
            'notifications-details'
          );
          notificationDetailDiv.appendChild(notificationDDiv);
          console.log(
            'Value currently is ' +
              JSON.stringify(result.info.notificationDetails)
          );
        });
      } else {
        document
          .querySelectorAll('.notification-list-item')
          .forEach((el) => el.remove());
        chrome.storage.local.get(['info']).then((result) => {
          const notificationResult = result.info.notificationDetails;
          const notificationDDiv = document.createElement('div');
          console.log('filter', notificationResult);
          notificationResult &&
            notificationResult.map((notificationItem) => {
              console.log('inside filter', notificationItem);
              const newContent = document.createElement('div');
              //  newContent.classList.add("notification-list-item")
              newContent.style.boxShadow = '2px 2px 5px saddlebrown';
              newContent.style.borderRadius = '10px';
              newContent.style.marginBottom = '-19px';
              newContent.classList.add('notification-list-item');
              newContent.classList.add('list-group-item');
              newContent.classList.add('list-group-item-warning');
              newContent.style.color = 'black';
              const text = document.createTextNode(
                `${notificationItem.substr(0, 150)}`
              );
              newContent.appendChild(text);
              notificationDDiv.appendChild(newContent);
              const br = document.createElement('br');
              br.classList.add('notification-list-item');
              notificationDDiv.appendChild(br);
            });
          const notificationDetailDiv = document.getElementById(
            'notifications-details'
          );
          notificationDetailDiv.appendChild(notificationDDiv);
        });
      }
    });
    const timeToRunScroll = document.createElement('INPUT');
    timeToRunScroll.style.width = '50px';
    timeToRunScroll.setAttribute('placeholder', 'time period (minute)');
    timeToRunScroll.setAttribute('type', 'text');
    timeToRunScroll.setAttribute('id', 'time-to-scroll');
    const emailInput = document.createElement('INPUT');
    emailInput.setAttribute('type', 'checkbox');
    emailInput.setAttribute('id', 'radio-notification');
    emailInput?.addEventListener('click', (event) => {
      console.log('event', event.target.checked);
      // listener call
      //saveOpenJobsEmail
      if (event.target.checked) {
        const loadingButton = document.getElementsByClassName('loading')[0];
        loadingButton.innerText = 'loading...(it will take a minute)';
        loadingButton.classList.display = 'block';
        setTimeout(() => {
          const setEmailsInDom = () => {
            console.log('emails in dom');
            const EmailsDiv = document.createElement('div');
            EmailsDiv.classList.add('list-group');
            chrome.storage.local.get(['emails']).then((res) => {
              res.emails.map((email) => {
                const newContent = document.createElement('div');
                newContent.classList.add('list-group-item');
                newContent.classList.add('list-group-item-warning');
                newContent.style.color = 'black';
                newContent.style.marginBottom = '7px';
                newContent.classList.add('email-list-item');
                const text = document.createTextNode(`${email}`);
                newContent.appendChild(text);
                EmailsDiv.appendChild(newContent);
                const br = document.createElement('br');
                br.classList.add('email-list-item');
              });
            });
            console.log('emails render', EmailsDiv);
            const EmailsParentDiv = document.getElementById('emails');
            console.log('div emaild', EmailsParentDiv);
            EmailsParentDiv && EmailsParentDiv.appendChild(EmailsDiv);
            const loadingButton = document.getElementsByClassName('loading')[0];
            loadingButton.classList.display = 'none !important';
            loadingButton.innerText = 'loaded successfully!';
          };
          setEmailsInDom();
        }, 1000 * 60);
        saveOpenJobsEmail();
      } else {
        clearInterval(emailInterval);
        const loadingButton = document.getElementsByClassName('loading')[0];
        loadingButton.style.display = 'none';
        chrome.storage.local.get(['emails']).then((res) => {
          console.log('emails', res.emails);
        });
      }
    });
    newContent.appendChild(text);
    newContent.appendChild(x);
    newContent1.appendChild(timeToRunScroll);
    newContent1.appendChild(textJobEmail);
    newContent1.appendChild(emailInput);
    newDiv.appendChild(newContent1);
    newDiv.appendChild(newContent);
    const br = document.createElement('br');
    newDiv.appendChild(br);
    const parent = document.getElementById('notifications-settings');
    parent.appendChild(newDiv);
  } else {
    document.querySelectorAll('.radio-select').forEach((e) => e.remove());
  }
});

const emailClear = document.getElementsByClassName('clear')[0];
emailClear.addEventListener('click', () => {
  chrome.storage.local.set({ emails: [] });
  document.querySelectorAll('.email-list-item').forEach((el) => el.remove());
});

const sendMail = document.getElementsByClassName('sendMail')[0];
sendMail.addEventListener('click', () => {
  chrome.storage.local.get(['emails']).then((res) => {
    const emails = res.emails.join(';');
    window.open(`https://mail.google.com/mail/u/0/?fs=1&tf=cm&bcc=${emails}`);
  });
});

const loadingButton = document.getElementsByClassName('loading')[0];
loadingButton.classList.display = 'none';
