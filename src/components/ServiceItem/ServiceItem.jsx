import React, {useState} from 'react';
import image from '../../asserts/er.jpg'
import favorite from '../../asserts/board/favorite.svg'
import WhiteBtn from "../../ui/WhiteBtn";
import BlackBtn from "../../ui/BlackBtn";
import phone_icon from "../../asserts/board/phone_icon.svg";
import '../../ui/btns.css'
import '../../ui/style.css'
import message_icon from "../../asserts/board/message_icon.svg";
import {relativeDate, STATIC_HOST} from "../../utils";
import ModalTemplate from "../Modal/ModalTemplate";
import {NavLink} from "react-router-dom";
import FavoriteBtn from "../../ui/favoriteBtn";
import {useSelector} from "react-redux";
import {v4 as uuidV4} from 'uuid';

const ServiceItem = ({item}) => {
  const [activeModal, setActiveModal] = useState(false)
  const {items} = useSelector(state => state.user.user)
  return (
    <div className='serviceItem'>
      <NavLink to={`/cardPage/${item?.id}`}>
        <div className="serviceItem_header flex ">
          <img src={`${STATIC_HOST}/${item?.previewImageAds[0].name}`} alt="" className='serviceItem_header-img'/>
          <div className="serviceItem_header_info">
            <h1 className='serviceItem_header_info-title'>{item.title}</h1>
            <h1 className='serviceItem_header_info-price'>{
              new Intl.NumberFormat('ru-RU', {
                style: 'currency', currency: 'RUB', maximumSignificantDigits: 3
              }).format(
                parseInt(item.price),
              )
            }</h1>
          </div>
          <FavoriteBtn id={item.id} isFavorite={item.favorites} userData={item.user}/>
        </div>
        <div className="serviceItem_description">
          {item.description}
        </div>
        <div className="serviceItem_time">
          <span>{relativeDate(new Date(item.createdAt))}</span>
        </div>
      </NavLink>


      <div className="serviceItem_btns flex space-between">
        <BlackBtn size={'w-156px'} children={<img src={phone_icon} alt="" className='icon'/>}
                  onClick={() => setActiveModal(true)}/>
        <NavLink state={{from: item.user, tovar: item}}
                 to={`/dialog/?adId=${item.user.id}&senderId=${item.user.id}&receiverId=${items.id}#chat-${uuidV4()}`}>
          <WhiteBtn size={'w-156px'} children={<img src={message_icon} alt="" className='icon'/>}/>
        </NavLink>
      </div>
      <ModalTemplate activeModal={activeModal} setActiveModal={setActiveModal} children={item.user.phone}/>
    </div>
  );
};

export default ServiceItem;