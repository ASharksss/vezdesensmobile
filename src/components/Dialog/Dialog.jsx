import React from 'react';
import './dialog.css'
import image from '../../asserts/original.jpg'
import {NavLink} from "react-router-dom";
import { STATIC_HOST, relativeDate } from '../../utils';

const Dialog = ({data, seller, status, image}) => {
  return (
    <div  className='dialog'>
      {/* <NavLink to='/dialog' className='noLink'> */}
        <div className=' flex'>
          <img src={`${STATIC_HOST}/${image}`} width={116}  alt="" className='dialog_img'/>
          <div className='dialog_info column space-evenly'>
            <h1 className='dialog_title'>{data.title}</h1>
            <div>
              <span className='dialog_info_name-price'>{data.receiver.name} • {data.price} ₽</span>
            </div>
            <div className='dialog_notification'>
            {data.unreadCount !== '0' ? <span className='dialog_messCount'>
          <span style={{
            backgroundColor: 'red',
            color: 'white',
            padding: 5,
            borderRadius: '50%',
            width: 32,
            textAlign: 'center'
          }}>{data.unreadCount}</span> </span> : null}
            </div>
            <div className='dialog_footer'>
              <span className='dialog_status green'>{status}</span>
              <span className='dialog_date'>{relativeDate(new Date(data.lastMessage))}</span>
            </div>
          </div>
        </div>
      {/* </NavLink> */}
    </div>

  );
};

export default Dialog;