import React from 'react';
import premium_img from '../../asserts/cards/premium_img.png'
import BlackBtn from "../../ui/BlackBtn";
import WhiteBtn from "../../ui/WhiteBtn";
import {NavLink} from "react-router-dom";
import favorite from "../../asserts/board/favorite.svg";
import phone_icon from "../../asserts/board/phone_icon.svg";
import message_icon from "../../asserts/board/message_icon.svg";
import FavoriteBtn from "../../ui/favoriteBtn";

const Premium = () => {
  return (
    <div className='premium_card'>
      <NavLink to='/cardPage' className='noLink'>
        <span className='card_favorite'><FavoriteBtn/></span>
        <img src={premium_img} alt="" className='premium_card-img'/>
        <div className='flex space-between items-center'>
          <div className="premium_card-info">
            <h1 className='premium_card-title'>Массажёр для глаз</h1>
            <h1 className='premium_card-address'>Казань, Проспект Победы</h1>
            <h1 className='premium_card-time'>Сегодня 11:32</h1>
            <h1 className='premium_card-price'>5000 ₽</h1>
          </div>
          <div className="flex items-center premium_card-btn">
            <WhiteBtn size={'w-54px'} children={<img src={message_icon} alt="" className='icon'/>}/>
            <BlackBtn size={'w-54px'} children={<img src={phone_icon} alt="" className='icon'/>}/>
          </div>
        </div>
      </NavLink>


    </div>
  );
};

export default Premium;