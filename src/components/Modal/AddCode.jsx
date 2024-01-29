import React from 'react';
import CloseBtn from "../../ui/closeBtn";
import BlackBtn from "../../ui/BlackBtn";
import {NavLink} from "react-router-dom";

const AddCode = ({setActiveModal}) => {
  return (
    <div className='missPassword relative'>
      <div className="missPassword_close">
        <CloseBtn handleClick={() => setActiveModal(false)}/>
      </div>
      <h1 className='missPassword_title'>Введите код</h1>
      <span className='missPassword_subtitle'>
        Пожалуйста, проверьте ваш телефон и
        введите код подтверждения</span>
      <input type="text" className='missPassword_input_add' placeholder={'Введите код'}/>
      <div className="flex">
        <span className='missPassword_sendAgain'>Отправить еще раз </span><span>1:34</span>
      </div>
      <NavLink to='/newPassword'>
        <BlackBtn children={'Подтвердить'} type={'white_text'} size={'w-275px'}/>
      </NavLink>
    </div>
  );
};

export default AddCode;