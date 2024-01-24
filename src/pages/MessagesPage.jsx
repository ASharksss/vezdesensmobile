import React from 'react';
import './pages.css'
import filter from '../asserts/messages/filter.svg'
import settings from '../asserts/messages/setting.svg'
import Dialog from "../components/Dialog/Dialog";

const MessagesPage = () => {
  return (
    <div className='messagePage'>
      <div className="messages_header flex items-center space-between">
        <div className='flex items-center'>
          <h1 className='messages_header-title'>Сообщения</h1>
          <span className='messages_header-count'> 11 </span>
        </div>
        <div className='flex items-center'>
          <img src={filter} alt="" className='messages_header-icon'/>
          <img src={settings} alt="" className='messages_header-icon'/>
        </div>
      </div>
      <div className="messages_list ">
        <Dialog/>
        <Dialog/>
        <Dialog/>
      </div>
    </div>
  );
};

export default MessagesPage;