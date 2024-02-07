import React from 'react';
import {NavLink} from "react-router-dom";
import './style.css'

const SelectFilter = ({page, items, name, setValue}) => {
  return (
    <div className='filter_item'>
      {
        page === 'createAdPage' ? null : <label className='enterFilter-title'>Название</label>
      }

      <NavLink to='/selectFilterPage' className='noLink'
               state={{item: items, name: name}}>
        <div className='selectInput'>Выберите значение...</div>
      </NavLink>
    </div>
  );
};

export default SelectFilter;