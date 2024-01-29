import React from 'react';
import image from '../../asserts/er.jpg'
import favorite from '../../asserts/board/favorite.svg'
import WhiteBtn from "../../ui/WhiteBtn";
import BlackBtn from "../../ui/BlackBtn";
import phone_icon from "../../asserts/board/phone_icon.svg";
import '../../ui/btns.css'
import '../../ui/style.css'
import message_icon from "../../asserts/board/message_icon.svg";

const ServiceItem = () => {

  return (
    <div className='serviceItem'>
      <div className="serviceItem_header flex ">
        <img src={image} alt="" className='serviceItem_header-img'/>
        <div className="serviceItem_header_info">
          <h1 className='serviceItem_header_info-title'>Водитель на автобетоносместитель</h1>
          <h1 className='serviceItem_header_info-price'>50000</h1>
        </div>
        <img src={favorite} alt=""/>
      </div>

      <div className="serviceItem_description">
        Полный день · Выплаты дважды в месяц · Опыт более 1 года
        Обязанности: Знание техники. Требования: Порядочность.
        Условия: О компании: ООО«Бетон Арт». Полный день · Выплаты дважды в месяц · Опыт более 1 года
        Обязанности: Знание техники.
      </div>

      <div className="serviceItem_time">
        <span>Сегодня 11:32</span>
      </div>
      <div className="serviceItem_btns flex space-between">
        <BlackBtn size={'w-156px'} children={<img src={phone_icon} alt="" className='icon'/>}/>
        <WhiteBtn size={'w-156px'} children={<img src={message_icon} alt="" className='icon'/>}/>
      </div>

    </div>
  );
};

export default ServiceItem;