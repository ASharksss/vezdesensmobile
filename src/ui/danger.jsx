import React from 'react';
import './style.css'
import danger from '../asserts/icons/danger_icon.svg'

const Danger = ({text}) => {
  return (
    <div className='danger_box flex items-center'>
      <img src={danger} alt=""/>
      <span className='danger_text'>{text}</span>
    </div>
  );
};

export default Danger;