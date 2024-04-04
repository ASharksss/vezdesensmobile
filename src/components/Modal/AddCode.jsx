import React, {useEffect, useState} from 'react';
import CloseBtn from "../../ui/closeBtn";
import BlackBtn from "../../ui/BlackBtn";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router";

const AddCode = ({email, setActiveModal, handleSendEmail}) => {
  const [second, setSecond] = useState(300)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  let timer

  const navigate = useNavigate()

  const handleSendCode = async (event) => {
    event.preventDefault()
    await axios.post('api/user/password/code', {code})
      .then(() => navigate('/newPassword', {state: {code}}))
      .catch(e => {
        setError(e.response.data.message)
      })
  }

  useEffect(() => {
    timer = setInterval(() => {
      setSecond(prevState => prevState - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (second <= 0) {
      clearInterval(timer)
    }
  }, [second])

  const minutes = Math.floor(second / 60);
  const remainingSeconds = second % 60;

  return (
    <div className='missPassword relative'>
      <div className="missPassword_close">
        <CloseBtn handleClick={() => setActiveModal(false)}/>
      </div>
      <h1 className='missPassword_title'>Введите код</h1>
      <span className='missPassword_subtitle'>
        Пожалуйста, проверьте ваш телефон и
        введите код подтверждения</span>
      <input type="email" className='missPassword_input_add' placeholder={'Введите код'}
             onChange={(e) => setCode(e.target.value)}/>
      <span className='auth_error'>{error}</span>
      <div className="flex">
        <span className='missPassword_sendAgain' onClick={handleSendEmail}>Отправить еще раз </span>
        <span>{minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</span>
      </div>
      <BlackBtn children={'Подтвердить'} type={'white_text'} size={'w-275px'} onClick={handleSendCode}/>
    </div>
  );
};

export default AddCode;