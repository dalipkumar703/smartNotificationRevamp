import React, { useState } from 'react';
// import { Button, Input } from 'react-bootstrap';
import { Button, Checkbox, Spin } from 'antd';
import { metricsApi } from '../../utils/domfunctions';
const SaveSearchNoti = (props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const handleSaveContacts = () => {};
  const handleNotification = () => {
    metricsApi('show_user_notif');
    console.log('notifciation filterS');
    props.setShowFilterNot(!props.showFilterNot);
  };
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
    console.log('inside execute script');
    const data = document.getElementsByClassName('feed-shared-update-v2');
    chrome.storage.local.get(['emails']).then((res) => {
      let emails = res.emails || [];
      for (let feed of data) {
        // feed.querySelector('.feed-shared-control-menu__trigger').click()
        // document.getElementsByClassName('option-share-via')[0].querySelector('.tap-target').click()
        // const postLink = document.getElementsByClassName('artdeco-toast-item__cta')[0].href
        const email = feed
          .querySelectorAll('span[dir=ltr]')[1]
          ?.innerText.split(' ')
          ?.filter((item) => item.includes('@'));
        const parsedEmail = parseEmail(email && email[0]);
        console.log('email', parsedEmail);
        // console.log("postLink",postLink)
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
    let emailInterval;
    chrome.storage.local.get(['timeToScroll']).then((res) => {
      const scrollTime = res.timeToScroll || '1';
      emailInterval = setInterval(() => {
        const minuteDiff = Math.abs(newDate - new Date()) / 36e5;

        if (minuteDiff > 0.016) {
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
          // setEmailsInDom(result.emails);
        });
    });
  };
  const handleCandidates = (event) => {
    console.log('inside candiddate', event);
    if (event.target?.checked) {
      metricsApi('load_candidate');
      setShowLoading(true);
      console.log('handle jobs');
      saveOpenJobsEmail();
      setTimeout(() => {
        showLoading(false);
        chrome.storage.local.get(['emails']).then((res) => {
          props.setEmails(res.emails);
        });
      }, 1000 * 60);
    }
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          style={{ backgroundColor: '#FFFF00' }}
          onClick={() => {
            metricsApi('settings_clicked');
            setShowSettings(!showSettings);
          }}
        >
          Settings
        </Button>
      </div>
      {showSettings && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {showLoading && (
            <div>
              Loading <Spin></Spin>
            </div>
          )}
          <Checkbox onChange={handleCandidates}>
            Save company/candidates emails
          </Checkbox>

          <Checkbox onChange={handleNotification}>
            select notification by user only
          </Checkbox>
        </div>
      )}
    </div>
  );
};

export default SaveSearchNoti;
