import React from 'react';
import image from '../../asserts/er.jpg'
import favorite from '../../asserts/board/favorite.svg'
import WhiteBtn from "../../ui/WhiteBtn";
import BlackBtn from "../../ui/BlackBtn";
import phone_icon from "../../asserts/board/phone_icon.svg";
import '../../ui/btns.css'
import '../../ui/style.css'
import message_icon from "../../asserts/board/message_icon.svg";
import {relativeDate, STATIC_HOST} from "../../utils";

const ServiceItem = ({item}) => {

  return (
    <div className='serviceItem'>
      <div className="serviceItem_header flex ">
        <img src={`${STATIC_HOST}/${item?.previewImageAds[0].name}`} alt="" className='serviceItem_header-img'/>
        <div className="serviceItem_header_info">
          <h1 className='serviceItem_header_info-title'>{item.title}</h1>
          <h1 className='serviceItem_header_info-price'>{
            new Intl.NumberFormat('ru-RU', {
              style: 'currency', currency: 'RUB', maximumSignificantDigits: 3}).format(
              parseInt(item.price),
            )
          }</h1>
        </div>
        <img src={favorite} alt=""/>
      </div>

      <div className="serviceItem_description">
        {item.description}
      </div>

      <div className="serviceItem_time">
        <span>{relativeDate(new Date(item.createdAt))}</span>
      </div>
      <div className="serviceItem_btns flex space-between">
        <BlackBtn size={'w-156px'} children={<img src={phone_icon} alt="" className='icon'/>}/>
        <WhiteBtn size={'w-156px'} children={<img src={message_icon} alt="" className='icon'/>}/>
      </div>

    </div>
  );
};

export default ServiceItem;