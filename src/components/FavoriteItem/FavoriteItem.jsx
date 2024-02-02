import React from 'react';
import './favoriteItem.css'
import on from '../../asserts/original.jpg'
import favorite from '../../asserts/board/favorite.svg'



const FavoriteItem = () => {
  return (
    <div className='favorite_item'>
      <div className="flex">
        <img src={on} alt="" className='favorite_image'/>
        <div className="favorite_info">
          <div className="flex items-center center">
            <span className='favorite_category'>Электроника</span>
            <img src={favorite} alt=""/>
          </div>
          <h1 className='favorite_title'>iPhone 14 pro max...</h1>
          <h2 className='favorite_price'>109 990</h2>
          <div className="column">
            <span className='favorite_status'>Активно</span>
            <span className='favorite_time'>Сегодня в 13:04</span>
            <span className='favorite_views'>1666 просмотров</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;