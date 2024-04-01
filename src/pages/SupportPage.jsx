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
import arrow_icon from '../asserts/icons/arrow_down.svg'

const SupportPage = () => {

  const {user} = useSelector(state => state.user)

  const [data, setData] = useState([])
  const [statusOfAppealId, setTypeAppeal] = useState(1)
  
  const [topic, setTopic] = useState('Открытые')
	const [open, setOpen] = useState(false)


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
  }, [user.status, statusOfAppealId])

 
  return (
    <>
      <div className="appeals">
        <h1 className='appeals-title'>Ваши обращения</h1>
        <button className='main_black_btn w-max h-38' onClick={() => setActiveModal(true)} >Задать вопрос</button>
        

        <div className="filter">
				<div className="Edited_appeal-select">
					<div className="flex items-center space-between Edited_filter-header" onClick={() => setOpen(!open)}>
						{/* Вывожу значние topic  */}
						{topic === 'Все' ? 'Все' : topic}
						<img src={arrow_icon} alt=""/>
					</div>
					<div className={open ? 'block Edited_filter_select-body' : 'filter_select-body-none'}>
						
								<div className='Edited_filter_select-item' onClick={() => {
									setTopic('Все')
									setTypeAppeal('')
									setOpen(!open)
								}}>Все</div>

<div className='Edited_filter_select-item' onClick={() => {
									setTopic('Открытые')
									setTypeAppeal(1)
									setOpen(!open)
								}}>Открытые</div>

<div className='Edited_filter_select-item' onClick={() => {
									setTopic('Решенные')
									setTypeAppeal(2)
									setOpen(!open)
								}}>Решенные</div>

					</div>
				</div>
			</div>

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