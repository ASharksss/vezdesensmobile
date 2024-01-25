import React from 'react';
import backbtn from '../asserts/cardPage/back_arrow.svg'
import DialogSender from "../components/Dialog/DialogSender";
import DialogRecipient from "../components/Dialog/DialogRecipient";
import attach_icon from '../asserts/messages/attach_icon.svg'
import send_icon from '../asserts/messages/send_icon.svg'
import {useNavigate} from "react-router";

const DialogPage = () => {

  const navigate = useNavigate()

  return (
    <div className='chatPage'>
      <div className="chat_page-header flex">
        <img src={backbtn} alt="" onClick={() => navigate(-1)}/>
        <div className="chat_info">
          <h1 className='chat_info-title'>iPhone 14 pro max 256gb</h1>
          <span className='chat_info-subtitle'>AppleMania • 109 990 ₽</span>
        </div>
      </div>
      <div className="chat_list">
        <DialogSender/>
        <DialogSender/>
        <DialogRecipient/>
        <DialogRecipient/>
        <DialogSender/>
        <DialogSender/>
        <DialogRecipient/>
        <DialogRecipient/>
      </div>
      <div className=" flex chat_input">
        <textarea rows='1' className='chat_textarea'/>
        <div className='flex'>
          <img src={attach_icon} alt="" className='chat_icon'/>
          <img src={send_icon} alt="" className='chat_icon'/>
        </div>
      </div>
    </div>
  );
};

export default DialogPage;