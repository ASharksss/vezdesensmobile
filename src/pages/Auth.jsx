import React, {useState} from 'react';
import Input from "../ui/input";
import Checkbox from "../ui/Checkbox";
import WhiteBtn from "../ui/WhiteBtn";
import BlackBtn from "../ui/BlackBtn";
import ModalTemplate from "../components/Modal/ModalTemplate";
import MissPassword from "../components/Modal/MissPassword";
import AddCode from "../components/Modal/AddCode";

const Auth = () => {

  const [activeModal, setActiveModal] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)
  const [codeModal, setCodeModal] = useState(false)

  return (
    <div className='auth'>
      <h1 className='auth_h1'>Вход</h1>
      <Input label={'Почта или Логин'} placeholder={'Введите почту или логин'}/>
      <Input label={'Пароль'} placeholder={'Введите пароль'}/>
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
          <WhiteBtn children={'Зарегистрироваться'} size={'w-325px'}/>
        </div>
        <div className="auth_btn">
          <BlackBtn children={'Войти'} type={'white_text'} size={'w-325px'}/>
        </div>
      </div>
      <ModalTemplate activeModal={activeModal} setActiveModal={setActiveModal} children={
        <>
          {passwordModal &&
            <MissPassword setPasswordModal={setPasswordModal} setActiveModal={setActiveModal} setCodeModal={setCodeModal}/>}
          {codeModal && <AddCode setActiveModal={setActiveModal}/>}
        </>
      }/>
    </div>
  );
};

export default Auth;