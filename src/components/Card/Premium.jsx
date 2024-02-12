import React from 'react';
import premium_img from '../../asserts/cards/premium_img.png'
import BlackBtn from "../../ui/BlackBtn";
import WhiteBtn from "../../ui/WhiteBtn";
import {NavLink} from "react-router-dom";
import favorite from "../../asserts/board/favorite.svg";
import phone_icon from "../../asserts/board/phone_icon.svg";
import message_icon from "../../asserts/board/message_icon.svg";
import FavoriteBtn from "../../ui/favoriteBtn";
import {relativeDate, STATIC_HOST} from "../../utils";

const Premium = ({data}) => {
  console.log(data)
  return (
    <div className='premium_card'>

      <span className='card_favorite'><FavoriteBtn id={data?.id} isFavorite={data?.favorites} userData={data?.user}/></span>

      <NavLink to={`/cardPage/${data?.id}`} className='noLink'>
        <img src={`${STATIC_HOST}/${data?.previewImageAds[0]?.name}`} alt="" className='premium_card-img'/>
        <div className='flex space-between items-center'>
          <div className="premium_card-info">
            <h1 className='premium_card-title'>{data?.title}</h1>
            <h1 className='premium_card-address'>{data?.address}</h1>
            <h1 className='premium_card-time'>{relativeDate(new Date(data?.createdAt))}</h1>
            <h1 className='premium_card-price'>{data?.price}</h1>
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