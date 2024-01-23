import React from 'react';
import './cards.css'
import MessageBtn from "../../ui/messageBtn";
import PhoneBtn from "../../ui/phoneBtn";
import card_img from '../../asserts/card_img.png'
import {NavLink} from "react-router-dom";
import vip_image from "../../asserts/board/vip_image.png";
import favorite from "../../asserts/board/favorite.svg"


const Card = ({classname}) => {
  return (
    <>
      {
        classname === 'xs' ?
          <div className='card'>
            <NavLink to='/cardPage' className='noLink'>
              <span className='card_favorite_icon'><img src={favorite} alt=""/></span>
              <div className="card_img">
                <img src={card_img} alt="" className='card_img-image'/>
              </div>
              <div className="card_info">
                <h1 className='card_info-title'>Массажёр для глаз</h1>
                <h2 className='card_info-address'>Казань, Проспект Победы</h2>
                <h2 className='card_info-time'>Сегодня 11:32</h2>
                <h1 className='card_info-price'>5000 ₽</h1>
              </div>
            </NavLink>
          </div> :
          classname === 's' ?
            <div className='plus_card'>
              <NavLink to='/cardPage' className='noLink'>
                <span className='card_favorite_icon'><img src={favorite} alt=""/></span>
                <div className="plus_card_img">
                  <img src={card_img} alt="" className='plus_card_img-image'/>
                </div>
                <div className="plus_card_info">
                  <h1 className='plus_card_info-title'>Массажёр для глаз</h1>
                  <h2 className='plus_card_info-address'>Казань, Проспект Победы</h2>
                  <h2 className='plus_card_info-time'>Сегодня 11:32</h2>
                  <h1 className='plus_card_info-price'>5000 ₽</h1>
                </div>
              </NavLink>
            </div> : classname === 'l' ?
              <div className='vip_card'>
                <NavLink to='/cardPage' className='noLink'>
                  <span className='card_favorite_icon'><img src={favorite} alt=""/></span>
                  <img src={vip_image} alt="" className='vip_card-img'/>
                  <div className='flex space-between items-center'>
                    <div className="premium_card-info">
                      <h1 className='premium_card-title'>Массажёр для глаз</h1>
                      <h1 className='premium_card-address'>Казань, Проспект Победы</h1>
                      <h1 className='premium_card-time'>Сегодня 11:32</h1>
                      <h1 className='premium_card-price'>5000 ₽</h1>
                    </div>
                    <div className="flex items-center premium_card-btn">
                      <MessageBtn/>
                      <PhoneBtn/>
                    </div>
                  </div>
                </NavLink>

              </div> : ''
      }

    </>

  );
};

export default Card;