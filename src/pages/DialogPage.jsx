import React, { useEffect, useRef, useState} from 'react';
import backbtn from '../asserts/cardPage/back_arrow.svg'
import DialogSender from "../components/Dialog/DialogSender";
import DialogRecipient from "../components/Dialog/DialogRecipient";
import attach_icon from '../asserts/messages/attach_icon.svg'
import send_icon from '../asserts/messages/send_icon.svg'
import { useSearchParams} from 'react-router-dom'
import {useHref, useLocation, useNavigate} from "react-router";
import {io} from 'socket.io-client'
import { useSelector } from 'react-redux';
import '../components/Dialog/dialog.css'


const DialogPage = () => {

  const [socket, setSocket] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsSenderId = searchParams.get('senderId');
  const paramsReceiverId = searchParams.get('receiverId');
  const paramsAdId =searchParams.get('adId')

  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(null)
  
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]); //условная data
  const {user} = useSelector(state => state.user)

  const location = useLocation()
  const {tovar} = location.state
  // console.log(tovar)
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const Wall = useRef(null); //Создаём реф


  const navigate = useNavigate()

  function connect()  {
    setSocket(io(`http://192.168.1.119:5001/?senderId=${paramsSenderId}&receiverId=${paramsReceiverId}&adId=${paramsAdId}`));
    // setSocket(io(`https://chat.vezdesens.ru/?senderId=${paramsSenderId}&receiverId=${paramsReceiverId}&adId=${paramsAdId}`));
  }
   // подлключение
  useEffect(() => {
    if (paramsAdId !== null && paramsSenderId !== null && paramsReceiverId !== null && socket === null) {
      connect();
    }
  }, [])

  useEffect(() => {
    // Автоматическая прокрутка вниз после каждого обновления сообщений
    if (messages.length > 0) {
      handleScrollTo();
    }
  }, [messages]);

  // Получаем сообщения
  useEffect(() => {
    if (isConnected) {
      setMessages([])
      socket.emit('getMessages')
      socket.on('getMessages', (data) => {
        setMessages(data)
      })
    }
  }, [isConnected])

  useEffect(() => {
    if (socket !== null) {
      setIsConnected(socket.connected)
      try {
        socket.connect();
        socket.on('message', (data) => {
          setMessages(prev => [...prev, data])
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [socket])
  
   // отправлка формы
   const handleSubmit = (event) => {
    event.preventDefault();
    setValue('')
    socket.timeout(100).emit('message', value, () => {
      textareaRef.current.style.height = '28px'
    });
  }
  
  function handleScrollTo() {
      Wall.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'end',
      });
  }
  
  // Отправлка по Энтр
  const handleKeyDownForSend = (event) => {
    if ((event.ctrlKey && event.key === 'Enter') && value.trim() !== '') {
      event.preventDefault();
      handleSubmit(event)
    }
  };
// Какая то загрузка 
useEffect(() => {
  if (value.trim() === '') {
    setIsLoading(true)
  } else {
    setIsLoading(false)
  }
}, [value])

  const handleChangeValue = (event) => {
    setValue(event.target.value)
    event.target.style.height = `auto`;
    event.target.style.height = `28px`;
  }

  // Какая то проверка
  useEffect(() => {
    if (isConnected !== null && socket !== null) {
      function onConnect() {
        setIsConnected(true);
      }

      function onDisconnect() {
        setIsConnected(false);
      }

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);

      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
      };
    }
  }, [isConnected, socket]);
  // console.log(tovar)
  return (
    <div className='chatPage' >
      <div className="chat_page-header flex">
        <img src={backbtn} alt="" onClick={() => navigate(-1)}/>
        <div className="chat_info">
          <h1 className='chat_info-title'>{tovar[0]?.title ? tovar[0].title : tovar.title}</h1>
          <span className='chat_info-subtitle'>{user.items.name   } • {tovar[0]?.price ? tovar[0].price : tovar.price } ₽</span>
        </div>
      </div>
      <div className="chat_list"  >
        {/* <DialogSender/>
        <DialogSender/>
        <DialogRecipient/>
        <DialogRecipient/>
        <DialogSender/>
        <DialogSender/>
        <DialogRecipient/>
        <DialogRecipient/> */}

        {messages.length > 0 ? messages.map((item, index) => (
          item.senderId === user.items.id ? 
                <DialogRecipient  text={item.text} date={item.createdAt} /> 
              : 
                <DialogSender  text={item.text} date={item.createdAt}/>
              )) :
            <p>Нет сообщений</p>}
            <span  id='bottom' style={{visibility: "hidden", height: "1px"}} ref={Wall}>asdf</span>
      </div>
      <form onSubmit={handleSubmit}>
      <div className=" flex chat_input">
        <textarea placeholder='Ваше сообщение...'
                  rows='1' className='chat_textarea'
                  ref={textareaRef}
                  value={value}
                  onKeyDown={handleKeyDownForSend}
                  onChange={handleChangeValue}
         />
        <div className='flex'>
          {/* <img src={attach_icon} alt="" className='chat_icon'/> */}
          {/* <img src={send_icon} alt="" className='chat_icon'/> */}
          <button disabled={isLoading} className='dialog_sender_btn' type="submit" 
          
                  ></button>
                  
        </div>
      </div>
     </form>
    </div>
  );
};

export default DialogPage;