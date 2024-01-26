import React from 'react';
import Back from "../ui/Back";
import CategoryItem from "../components/CategoryItem/CategoryItem";
import arrow from "../asserts/car_arrow.svg";
import {NavLink} from "react-router-dom";

const SubCategoryPage = () => {
  return (
    <div className='subCategory'>
      <div className="subCategory_header flex items-center">
        <Back/>
        <h1 className='subCategory_header-title'>Транспорт</h1>

      </div>
      <div className="category_list">
        <CategoryItem address={'categoryPage'}/>
        <CategoryItem address={'categoryPage'}/>
        <CategoryItem address={'categoryPage'}/>
        <CategoryItem address={'categoryPage'}/>
        <NavLink to={'/servicePage'} className='noLink'>
          <div className="category_item flex items-center space-between">
            <span className='category_item-title'>Работа</span>
            <img src={arrow} alt="" className='category_item-icon'/>
          </div>
        </NavLink>
      </div>

    </div>
  );
};

export default SubCategoryPage;