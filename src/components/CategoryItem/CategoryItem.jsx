import React from 'react';
import './category_list.css'
import arrow from '../../asserts/car_arrow.svg'
import {NavLink} from "react-router-dom";

const CategoryItem = ({address, item}) => {
  return (
    <NavLink to={`/${address}/${item.id}`} className='noLink'>
      <div className="category_item flex items-center space-between">
        <span className='category_item-title'>{item.name.indexOf('/') > 1 ? item.name.split('/')[0] : item.name}</span>
        <img src={arrow} alt="" className='category_item-icon'/>
      </div>
    </NavLink>
  );
};

export default CategoryItem;