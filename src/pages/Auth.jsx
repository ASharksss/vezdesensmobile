import React, {useState} from 'react';
import Input from "../ui/input";
import Checkbox from "../ui/Checkbox";
import WhiteBtn from "../ui/WhiteBtn";
import BlackBtn from "../ui/BlackBtn";
import ModalTemplate from "../components/Modal/ModalTemplate";
import MissPassword from "../components/Modal/MissPassword";
import AddCode from "../components/Modal/AddCode";
import {NavLink} from "react-router-dom";
import Danger from "../ui/danger";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin} from "../redux/slices/AuthSlice";

const Auth = () => {

  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user)

  const [activeModal, setActiveModal] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)
  const [codeModal, setCodeModal] = useState(false)
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const isLoading = user.status === 'loading'

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {login, password}
    await dispatch(fetchLogin(data))
  }

  return (
    <form className='auth' onSubmit={handleSubmit}>

      <h1 className='auth_h1'>Вход</h1>
      <Input label={'Почта или Логин'} placeholder={'Введите почту или логин'} value={login}
             onChangeValue={setLogin} required={true}/>
      <Input label={'Пароль'} placeholder={'Введите пароль'} value={password} typeInput={'password'}
             onChangeValue={setPassword} required={true}/>
      {
        user.errorMsg !== '' && <Danger text={user.errorMsg}/>
      }

      <div className="auth_info ">
        <Checkbox label={'Запоминть меня'} id={'checkbox'}/>
        <span className='auth_missPassword' onClick={() => {
          setActiveModal(true)
          setCodeModal(false)
          setPasswordModal(true)
        }}>Забыли пароль?</span>
      </div>
      <div className="auth_btns">
        <div className="auth_btn">
          <NavLink to='/registration'>
            <WhiteBtn children={'Зарегистрироваться'} size={'w-325px'}/>
          </NavLink>
        </div>
        <div className="auth_btn">
          <BlackBtn btnType={'submit'} children={'Войти'} type={'white_text'} size={'w-325px'}/>
        </div>
      </div>
      <ModalTemplate activeModal={activeModal} setActiveModal={setActiveModal} children={
        <>
          {passwordModal &&
            <MissPassword setPasswordModal={setPasswordModal} setActiveModal={setActiveModal}
                          setCodeModal={setCodeModal}/>}
          {codeModal && <AddCode setActiveModal={setActiveModal}/>}
        </>
      }/>
    </form>
  );
};

export default Auth;