import React, {useState, useEffect} from 'react';
import Input from "../ui/input";
import WhiteBtn from "../ui/WhiteBtn";
import BlackBtn from "../ui/BlackBtn";
import {NavLink} from "react-router-dom";
import InputMask from 'react-input-mask';
import {useDispatch} from "react-redux";
import {fetchRegistration} from "../redux/slices/AuthSlice";
import {useNavigate} from "react-router";

const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, setLogin] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Регистрация'
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {login, phone, email, password}
    dispatch(fetchRegistration(data)).then((res) => {
      if (res.error) {
        setError(res.error.message)
      }
      if (res.error === undefined) {
        const pathname = localStorage.getItem('last_path') || '/'
        navigate(pathname)
      }
    })
  }

  return (
    <form className='column items-center center' onSubmit={handleSubmit}>
      <h1 className='reg_title'>Регистрация</h1>
      <Input label={'ФИО'} placeholder={'Введите ФИО'} onChangeValue={setLogin} value={login} required={true}/>
      <div className='input column'>
        <label htmlFor="" className='input_label'>Телефон</label>
        <InputMask mask="+7 (999) 999-99-99" className='input_form usually' placeholder='Введите номер телефона'
                   required
                   onChange={event => setPhone(event.target.value)} value={phone} />
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