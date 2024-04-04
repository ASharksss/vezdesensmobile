import React, {useState} from 'react';
import CloseBtn from "../../ui/closeBtn";
import BlackBtn from "../../ui/BlackBtn";

const MissPassword = ({setActiveModal, setEmail, handleSendEmail, error}) => {

  return (
    <div className='missPassword relative'>
      <div className="missPassword_close">
        <CloseBtn handleClick={() => setActiveModal(false)}/>
      </div>
      <h1 className='missPassword_title'>Забыли пароль?</h1>
      <span className='missPassword_subtitle'>Введите номер телефона для получение одноразового кода</span>
      <input type="text" className='missPassword_input' placeholder={'Введите электронную почту'}
             onChange={(e) => setEmail(e.target.value)} required/>
      <span className='auth_error'>{error}</span>
      <div>
        <BlackBtn children={'Отправить код'} type={'white_text'} size={'w-275px'} onClick={handleSendEmail}/>
      </div>
    </div>
  );
};

export default MissPassword;