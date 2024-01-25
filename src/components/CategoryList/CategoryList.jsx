import React from 'react';
import './category_list.css'
import arrow from '../../asserts/car_arrow.svg'
import {NavLink} from "react-router-dom";

const CategoryList = () => {
  return (
    <NavLink to='/subCategory' className='noLink'>
      <div className="category_item flex items-center space-between">
        <span className='category_item-title'>Транспорт</span>
        <img src={arrow} alt="" className='category_item-icon'/>
      </div>
    </NavLink>


  );
};

export default CategoryList;