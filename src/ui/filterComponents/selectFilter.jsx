import React from 'react';
import {NavLink} from "react-router-dom";
import './style.css'

const SelectFilter = ({page}) => {
  return (
    <div className='filter_item'>
      {
        page === 'createAdPage' ? null :  <label className='enterFilter-title'>Название</label>
      }

      <NavLink to='/selectFilterPage' className='noLink'>
        <div className='selectInput'>Выберите значение...</div>
      </NavLink>
    </div>
  );
};

export default SelectFilter;