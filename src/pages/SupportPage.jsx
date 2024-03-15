import React, {Children, useEffect, useState} from 'react';
import backbtn from '../asserts/cardPage/back_arrow.svg'
import DialogSender from "../components/Dialog/DialogSender";
import DialogRecipient from "../components/Dialog/DialogRecipient";
import attach_icon from '../asserts/messages/attach_icon.svg'
import send_icon from '../asserts/messages/send_icon.svg'
import {useNavigate} from "react-router";
import Appeal from "../components/Support/Appeal";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import DialogAppeal from '../components/Support/dialogAppeal';
import ModalTemplate from '../components/Modal/ModalTemplate';
import AddAppeal from '../components/Modal/AddAppeal';
import { useSelector } from 'react-redux';

const SupportPage = () => {

  const {user} = useSelector(state => state.user)

  const [data, setData] = useState([])
  const [statusOfAppealId, setTypeAppeal] = useState(1)

  const [activeModal, setActiveModal] = useState(false);

 

  const getData = async () => {
    await axios({
      method: 'GET',
      url: 'api/support/getAllAppeal',
      params: {statusOfAppealId}
    }).then(res => setData(res.data))
  }

  useEffect(() => {
    if (user.status === 'loading') return; // заглушка для получения данных при обнавлении
    getData()
  }, [user.status])

 
  return (
    <>
      <div className="appeals">
        <h1 className='appeals-title'>Ваши обращения</h1>
        <button className='main_black_btn w-max h-38' onClick={() => setActiveModal(true)} >Задать вопрос</button>
        {
          data.map(item => (
            <NavLink state={{data: item}} to={`/appeal/?id=${item.id}`} className='appeal'>
            <Appeal item={item}/>
            </NavLink>
          ))
          
        }

      </div>
      {
      
      activeModal ? <ModalTemplate activeModal={activeModal} setActiveModal={setActiveModal} children={<AddAppeal/>}/>
      : null
      }

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