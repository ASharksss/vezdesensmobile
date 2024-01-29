import React from 'react';
import Input from "../ui/input";

const Registration = () => {
  return (
    <div>
      <h1>Регистрация</h1>
      <Input label={'ФИО'}/>
      <Input label={'Телефон'}/>
      <Input label={'Почта'}/>
      <Input label={'Пароль'}/>
    </div>
  );
};

export default Registration;