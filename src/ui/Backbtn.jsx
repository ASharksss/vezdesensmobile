import React from 'react';
import './btns.css'
import back_icon from '../asserts/cardPage/back_arrow.svg'
import {useNavigate} from "react-router";

const Backbtn = () => {
  const navigate = useNavigate()
  return (
    <div className='flex' onClick={() => navigate(-1 || '/')}>
      <img className='backbtn_icon' src={back_icon} alt=""/>
      <span>Назад</span>
    </div>
  );
};

export default Backbtn;
