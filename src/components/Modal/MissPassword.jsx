import React from 'react';
import CloseBtn from "../../ui/closeBtn";
import BlackBtn from "../../ui/BlackBtn";

const MissPassword = ({setPasswordModal, setActiveModal, setCodeModal}) => {

  return (
    <div className='missPassword relative'>
      <div className="missPassword_close">
        <CloseBtn handleClick={() => setActiveModal(false)}/>
      </div>
      <h1 className='missPassword_title'>Забыли пароль?</h1>
      <span className='missPassword_subtitle'>Введите номер телефона для получение одноразового кода</span>
      <input type="text" className='missPassword_input' placeholder={'Введите электронную почту'}/>
      <div onClick={() => {
        setPasswordModal(false)
        setCodeModal(true)
      }}>
        <BlackBtn children={'Отправить код'} type={'white_text'} size={'w-275px'}/>
      </div>
    </div>
  );
};

export default MissPassword;