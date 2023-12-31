import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import NotificationOverview from '../../containers/NotificationOverview';
import SaveSearchNoti from '../../containers/SaveSearchNotifications';
import UserMessage from '../../containers/UserMessages';
import NotificationMessages from '../../containers/NotificationMessages';
import { metricsApi, notificationUpdates } from '../../utils/domfunctions';
import { Button } from 'antd';

const Popup = () => {
  const [info, setInfo] = useState({})
  const [emails, setEmails] = useState([])
  const [showFilterNot, setShowFilterNot] = useState(false)
  useEffect(()=>{
    metricsApi('open_smart_notificatiton')
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
                  // setDOMInfo(result[0].result);
                  setInfo(result[0].result)
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
  },[])

  const displayEmails = () =>{
    setTimeout(()=>{
      const setEmailsInDom = () => {
        console.log("emails in dom")
        const EmailsDiv = document.createElement('div')
        EmailsDiv.classList.add('list-group')
        chrome.storage.local.get(['emails']).then((res)=>{
            
          res.emails.map(email=>{
            const newContent = document.createElement('div')
            newContent.classList.add("list-group-item")
            newContent.classList.add("list-group-item-warning")
            newContent.style.color = 'black'
            newContent.style.marginBottom = '7px'
            newContent.classList.add("email-list-item")
            const text = document.createTextNode(`${email}`)
            newContent.appendChild(text)
            EmailsDiv.appendChild(newContent);
            const br = document.createElement("br");
            br.classList.add("email-list-item")
          })
        })
        console.log("emails render",EmailsDiv)
        const EmailsParentDiv = document.getElementById('emails')
        console.log("div emaild",EmailsParentDiv)
        EmailsParentDiv && EmailsParentDiv.appendChild(EmailsDiv)
        const loadingButton = document.getElementsByClassName('loading')[0]
        loadingButton.classList.display = 'none !important'
        loadingButton.innerText = "loaded successfully!"

      }
    setEmailsInDom()
    },1000*60)
  }

 
  return (
    <div className="App">
      <SaveSearchNoti info={info} setEmails={setEmails} showFilterNot={showFilterNot} setShowFilterNot={setShowFilterNot}/>
      <NotificationOverview info={info} emails={emails} setEmails={setEmails}/>
      
      <NotificationMessages info={info} showFilterNot={showFilterNot}/>
      <UserMessage info={info}/>
      <div>
        <Button style={{backgroundColor: '#FFFF00'}} onClick={()=>{
          metricsApi('donate')
          window.open("https://linktr.ee/wwowo")}}>Donate</Button>
        <Button style={{backgroundColor: '#FFFF00'}}  onClick={()=>{
           metricsApi('how_to')
          window.open("https://www.youtube.com/watch?v=ULHUG_CD44U")}}>How to use tutorial</Button>
        <Button style={{backgroundColor: '#FFFF00'}}  onClick={()=>{
           metricsApi('feedback')
          window.open("https://mail.google.com/mail/?view=cm&fs=1&to=dalippublic@gmail.com")}}>Feedback</Button>
      </div>
    </div>
  );
};

export default Popup;
