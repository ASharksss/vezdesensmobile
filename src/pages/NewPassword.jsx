import React from 'react';
import Input from "../ui/input";
import BlackBtn from "../ui/BlackBtn";

const NewPassword = () => {
  return (
    <div className='column center items-center'>
      <h1 className='new_password-title'>Новый пароль</h1>
      <span className='new_password-subtitle'>Придумайте новый пароль для входа</span>

      <Input label={'Новый пароль'} placeholder={'Введите новый пароль'}/>
      <Input label={'Новый пароль еще раз'} placeholder={'Введите новый пароль'}/>
      <div className='new_password_btn'>
        <BlackBtn children={'Восстановить'} type={'white_text'} size={'w-325px'}/>
      </div>
    </div>
  );
};

export default NewPassword;