import React from 'react';
import './category_list.css'
import arrow from '../../asserts/car_arrow.svg'
import {NavLink} from "react-router-dom";

const CategoryItem = ({address}) => {
  return (
    <NavLink to={'/' + address} className='noLink'>
      <div className="category_item flex items-center space-between">
        <span className='category_item-title'>Транспорт</span>
        <img src={arrow} alt="" className='category_item-icon'/>
      </div>
    </NavLink>


  );
};

export default CategoryItem;