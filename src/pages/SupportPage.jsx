import React, {useEffect, useState} from 'react';
import backbtn from '../asserts/cardPage/back_arrow.svg'
import DialogSender from "../components/Dialog/DialogSender";
import DialogRecipient from "../components/Dialog/DialogRecipient";
import attach_icon from '../asserts/messages/attach_icon.svg'
import send_icon from '../asserts/messages/send_icon.svg'
import {useNavigate} from "react-router";
import Appeal from "../components/Support/Appeal";
import axios from "axios";

const SupportPage = () => {

  const [data, setData] = useState([])
  const [statusOfAppealId, setTypeAppeal] = useState(1)


  const getData = async () => {
    await axios({
      method: 'GET',
      url: 'api/support/getAllAppeal',
      params: {statusOfAppealId}
    }).then(res => setData(res.data))
  }

  useEffect(() => {
    getData()
  }, [])


  return (

    <>
      <div className="appeals">
        <h1 className='appeals-title'>Ваши обращения</h1>
        {
          data.map(item => (
            <Appeal item={item}/>
          ))
        }

      </div>

      {/*<div className='chatPage'>
        <div className="chat_page-header flex">
          <img src={backbtn} alt="" onClick={() => navigate(-1)}/>
          <div className="chat_info">
            <h1 className='chat_info-title'>Техническая поддержка</h1>
          </div>
        </div>
        <div className="chat_list">
          <DialogSender/>
          <DialogRecipient/>
        </div>
        <div className=" flex chat_input">
          <textarea rows='1' className='chat_textarea'/>
          <div className='flex'>
            <img src={attach_icon} alt="" className='chat_icon'/>
            <img src={send_icon} alt="" className='chat_icon'/>
          </div>
        </div>
      </div>*/}

    </>

  );
};

export default SupportPage;