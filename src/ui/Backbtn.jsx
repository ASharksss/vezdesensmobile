import React from 'react';
import './btns.css'
import back_icon from '../asserts/cardPage/back_arrow.svg'

const Backbtn = () => {
  return (
    <div className='flex'>
      <img className='backbtn_icon' src={back_icon} alt=""/>
      <span>Назад</span>
    </div>
  );
};

export default Backbtn;