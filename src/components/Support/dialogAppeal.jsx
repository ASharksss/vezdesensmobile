import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";

// import attach_icon from '../../../../asserts/messages/attach_icon.svg'
// import send_icon from '../../../../asserts/messages/send_icon.svg'
import backbtn from '../../asserts/cardPage/back_arrow.svg'
import '../../components/Dialog/dialog.css'
import DialogRecipient from '../Dialog/DialogRecipient';
import DialogSender from '../Dialog/DialogSender';
import NothingYeat from '../nothingYeat/nothingYeat';

const DialogAppeal = ({isSupport}) => {

  const [data, setData] = useState([])
  const [message, setMessage] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()
  const appealId = searchParams.get('id')
  const [isLoading, setIsLoading] = useState(true);


  const Wall = useRef(null); //Создаём реф

  const navigate = useNavigate()

  const getData = async () => {
    await axios.get(`api/support/getMessagesOfAppeal?id=${appealId}`)
      .then(res => setData(res.data))
  }

  const postMessage = async (event) => {
    event.preventDefault()
    const info = {
      text: message,
      appealId: appealId,
      isSupport
    }
    await axios.post(`api/support/createMessage`, info)
      .then(async () => {
        await getData()
        setMessage('')
      })
  }
//   Пока неиспользуемый закрытие обращения 
//   можно при последнем ответе Поддержки рендерить кнопку закрытия обращения 
  const closeAppeal = async () => {
    await axios.put('api/support/closeAppeal', {appealId})
      .then(() => navigate(`/support`))
  }

// Рендер Фкнуция скролллинга
    useEffect(() => {
    // Автоматическая прокрутка вниз после каждого обновления сообщений
    if (data.length > 0) {
      handleScrollTo();
    }
  }, [data]);

  function handleScrollTo() {
    Wall.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'end',
    });
  }
  useEffect(() => {
    if (message.trim() === '') {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [message])
  

  useEffect(() => {
    getData()
  }, [])

  return (
    <>    
    <div className='FixBlock'></div>
    <div className='chatPage'>
      <div className="chat_page-header flex">
        <img src={backbtn} alt="" onClick={() => navigate(-1)}/>
        <div className="chat_info flex items-center">
          <h1 className='chat_info-title'>Техническая поддержка</h1>
        </div>
        <button className='main_black_btn w-100 h-38 fz-10' onClick={closeAppeal}>Вопрос решен</button>
      </div>
      <div className="chat_list">
      {data.length > 0 ? data.map((item, index) => (
          item.isSupport === false ? 
                <DialogRecipient  text={item.text} date={item.createdAt} /> 
              : 
                <DialogSender  text={item.text} date={item.createdAt}/>
              )) :
            <NothingYeat message={'Сообщений пока нет'}/>}
            <span  id='bottom' style={{visibility: "hidden", height: "1px"}} ref={Wall}>asdf</span>
      </div> 
      
      <form onSubmit={postMessage}>
      <div className=" flex chat_input">
        <textarea placeholder='Ваше сообщение...'
                  rows='1' className='chat_textarea'
                //   ref={textareaRef}
                  value={message}
                //   onKeyDown={handleKeyDownForSend}
                  onChange={e => setMessage(e.target.value)}
         />
        <div className='flex'>
          <button disabled={isLoading} className='dialog_sender_btn' type="submit" ></button>
        </div>
      </div>
     </form>
    </div>
    <div className='FixAnotherBlock'></div>
    </>
  );
};

export default DialogAppeal;
