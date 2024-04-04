import React from 'react';
import {NavLink} from "react-router-dom";
import image from "../../asserts/original.jpg";
import { relativeDate } from '../../utils';

const Appeal = ({item}) => {
  return (
    <div className='dialog'>
      {/* <NavLink to={`/support?id=${item.id}`} className='noLink'> */}

        <div className='dialog_info'>
          <h1 className='dialog_title'>Обращение номер: {item.id}</h1>
          <div>
            <span className='dialog_info_name-price'>Tема обращения: {item.topicOfAppeal.name}</span>
          </div>
          <div className='dialog_footer'>
            <span className={item.statusOfAppeal.name === 'Активно' ? 'dialog_status green' : 'dialog_status gray' }>{item.statusOfAppeal.name }</span>
            <span className='dialog_date'>{relativeDate(new Date(item.createdAt))}</span>
          </div>
        </div>

      {/* </NavLink> */}
    </div>

  );
};

export default Appeal;