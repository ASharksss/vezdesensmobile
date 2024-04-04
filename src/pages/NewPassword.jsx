import React, {useState} from 'react';
import Input from "../ui/input";
import BlackBtn from "../ui/BlackBtn";
import {NavLink} from "react-router-dom";
import {useLocation, useNavigate} from "react-router";
import axios from "axios";

const NewPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {code} = location.state
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')

  const handleChangePassword = async (event) => {
    event.preventDefault()
    setError('')
    if (password !== repeatPassword) return setError('Пароли не совпадают!')
    await axios.post('api/user/password/change', {code, password})
      .then(res => {
        window.alert(res.data.message)
        navigate('/auth')
      })
      .catch(err => {
        setError(err.response.data.message)
      })
  }

  return (
    <div className='column center items-center'>
      <h1 className='new_password-title'>Новый пароль</h1>
      <span className='new_password-subtitle'>Придумайте новый пароль для входа</span>
      <Input label={'Новый пароль'} placeholder={'Введите новый пароль'}
             onChangeValue={setPassword} value={password}/>
      <Input label={'Новый пароль еще раз'} placeholder={'Введите новый пароль'}
             onChangeValue={setRepeatPassword} value={repeatPassword}/>
      <div className='new_password_btn'>
        <NavLink to='/auth'>
          <BlackBtn children={'Восстановить'} type={'white_text'} size={'w-325px'} onClick={handleChangePassword}/>
        </NavLink>
      </div>
    </div>
  );
};

export default NewPassword;