import React from 'react';
import backbtn from '../asserts/cardPage/back_arrow.svg'

const DialogPage = () => {
  return (
    <div className='chatPage'>
      <div className="chat_page-header flex">
        <img src={backbtn} alt=""/>
        <div className="chat_info">
          <h1 className='chat_info-title'>iPhone 14 pro max 256gb</h1>
          <span className='chat_info-subtitle'>AppleMania • 109 990 ₽</span>
        </div>
      </div>



    </div>
  );
};

export default DialogPage;