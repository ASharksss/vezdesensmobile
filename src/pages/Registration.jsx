import React from 'react';
import Input from "../ui/input";
import WhiteBtn from "../ui/WhiteBtn";
import BlackBtn from "../ui/BlackBtn";
import {NavLink} from "react-router-dom";

const Registration = () => {
  return (
    <div className='column items-center center'>
      <h1 className='reg_title'>Регистрация</h1>
      <Input label={'ФИО'}/>
      <Input label={'Телефон'}/>
      <Input label={'Почта'}/>
      <Input label={'Пароль'}/>
      <div className="reg_btns">
        <div className="reg_btn">
          <NavLink to='/auth'>
            <WhiteBtn children={'Войти'} size={'w-325px'}/>
          </NavLink>
        </div>
        <div className="reg_btn">
          <BlackBtn children={'Зарегистрироваться'} size={'w-325px'} type={'white_text'}/>
        </div>
      </div>
    </div>
  );
};

export default Registration;