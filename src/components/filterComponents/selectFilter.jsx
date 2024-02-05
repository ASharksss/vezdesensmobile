import React from 'react';
import {NavLink} from "react-router-dom";
import './style.css'

const SelectFilter = () => {
  return (
    <div className='filter_item'>
      <label className='enterFilter-title'>Название</label>
      <NavLink to='/selectFilterPage' className='noLink'>
        <div type="text" className='selectInput'>Выберите значение...</div>
      </NavLink>
    </div>
  );
};

export default SelectFilter;