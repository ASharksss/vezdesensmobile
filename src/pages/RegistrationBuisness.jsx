import React, {useState} from 'react';
import Input from "../ui/input";
import WhiteBtn from "../ui/WhiteBtn";
import BlackBtn from "../ui/BlackBtn";
import {NavLink} from "react-router-dom";
import InputMask from 'react-input-mask';
import {useDispatch} from "react-redux";
import {fetchRegistration, fetchRegistrationCompany} from "../redux/slices/AuthSlice";
import {useNavigate} from "react-router";
import axios from "axios";

const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [INN, setINN] = useState('')
  const [nameCompany, setNameCompany] = useState('')
  const [name, setName] = useState('')
  const [surName, setSurName] = useState('')
  const [login, setLogin] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleCheckINN = async (event) => {
    setINN(event.target.value)
    if (event.target.value.length === 10) {
      await axios.post('api/user/checkINN', {inn: event.target.value})
        .then(res => {
          setNameCompany(res.data?.name)
        })
        .catch(err => {
          window.alert('Организация не найдена')
        })
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    const data = {
      login, name: `${name} ${surName}`, phone, email, password, companyName: nameCompany, inn: INN
    }
    dispatch(fetchRegistrationCompany(data))
      .then((res) => {
        if (res.error) {
          setError(res.error.message)
        }
        if (res.error === undefined) {
          const pathname = localStorage.getItem('last_path') || '/'
          navigate(pathname)
          window.location.reload()
        }
      })
  }

  return (
    <form className='column items-center center' onSubmit={handleSubmit}>
      <h1 className='reg_title'>Регистрация</h1>
      <div className='input column'>
        <label htmlFor="" className='input_label'>ИНН</label>
        <input placeholder='ИНН' className={'input_form usually'} value={INN} onChange={handleCheckINN} required/>
      </div>
      <Input label={'Название компании'} placeholder={'Введите название компании'} onChangeValue={setNameCompany}
             value={nameCompany} required={true}/>
      <Input label={'Фамилия'} placeholder={'Введите фамилию'} onChangeValue={setSurName} value={surName}
             required={true}/>
      <Input label={'Имя'} placeholder={'Введите имя'} onChangeValue={setName} value={name}
             required={true}/>
      <Input label={'Логин'} placeholder={'Введите логин'} onChangeValue={setLogin} value={login}
             required={true}/>
      <div className='input column'>
        <label className='input_label'>Телефон</label>
        <InputMask mask="+7 (999) 999-99-99" className='input_form usually' placeholder='Введите номер телефона'
                   required onChange={event => setPhone(event.target.value)} value={phone}/>
      </div>
      <Input label={'Почта'} onChangeValue={setEmail} value={email} required={true} typeInput={'email'}/>
      <Input label={'Пароль'} typeInput={'password'} onChangeValue={setPassword} value={password} required={true}/>
      <div className="reg_btns">
        <div className="reg_btn">
          <NavLink to='/auth'>
            <WhiteBtn children={'Войти'} size={'w-325px'}/>
          </NavLink>
        </div>
        <div className="reg_btn">
          <BlackBtn children={'Зарегистрироваться'} size={'w-325px'} type={'white_text'} btnType={'submit'}/>
        </div>
      </div>
    </form>
  );
};

export default Registration;