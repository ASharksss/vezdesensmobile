import React from 'react';
import './dialog.css'
import image from '../../asserts/original.jpg'
import {NavLink} from "react-router-dom";

const Dialog = () => {
  return (
    <div  className='dialog'>
      <NavLink to='/dialog' className='noLink'>
        <div className=' flex'>
          <img src={image} alt="" className='dialog_img'/>
          <div className='dialog_info'>
            <h1 className='dialog_title'>iPhone 14 pro max 256gb...</h1>
            <div>
              <span className='dialog_info_name-price'>AppleMania • 109 990 ₽</span>
            </div>
            <div className='dialog_notification'>
              <span className='dialog_messCount'>11</span>
            </div>
            <div className='dialog_footer'>
              <span className='dialog_status green'>Активно</span>
              <span className='dialog_date'>6 нояб</span>
            </div>
          </div>
        </div>
      </NavLink>

    </div>

  );
};

export default Dialog;