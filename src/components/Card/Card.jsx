import React, {useState} from 'react';
import './cards.css'
import WhiteBtn from "../../ui/WhiteBtn";
import BlackBtn from "../../ui/BlackBtn";
import card_img from '../../asserts/card_img.png'
import {NavLink} from "react-router-dom";
import vip_image from "../../asserts/board/vip_image.png";
import favorite from "../../asserts/board/favorite.svg"
import phone_icon from "../../asserts/board/phone_icon.svg";
import message_icon from "../../asserts/board/message_icon.svg";
import {numberWithSpaces, relativeDate, STATIC_HOST} from "../../utils";
import FavoriteBtn from "../../ui/favoriteBtn";
import ModalTemplate from "../Modal/ModalTemplate";
import {v4 as uuidV4} from 'uuid';
import {useSelector} from "react-redux";


const Card = ({classname, data}) => {
  const [activeModal, setActiveModal] = useState(false)
  const {items} = useSelector(state => state.user.user)


  return (
    <>
      {
        classname === 'xs' ?
          <div className='card'>
            <div className='card_favorite'>
              <FavoriteBtn id={data?.id} isFavorite={data?.favorites} userData={data?.user}/>
            </div>

            <NavLink to={`/cardPage/${data?.id}`} className='noLink'>
              <div className="card_img">
                <img src={`${STATIC_HOST}/${data?.previewImageAds[0]?.name}`} alt=""
                     className='card_img-image'/>
              </div>
              <div className="card_info">
                <h1 className='card_info-title'>{data?.title}</h1>
                <h2 className='card_info-address'>{data?.address}</h2>
                <h2 className='card_info-time'>{relativeDate(new Date(data?.createdAt))}</h2>
                <h1 className='card_info-price'>{numberWithSpaces(parseInt(data?.price))} <span
                  style={{fontFamily: 'Arial'}}> ₽</span></h1>
              </div>
            </NavLink>
          </div> :
          classname === 's' ?
            <div className='plus_card'>

              <span className='card_favorite'><FavoriteBtn id={data?.id} isFavorite={data?.favorites}
                                                           userData={data?.user}/></span>
              <NavLink to={`/cardPage/${data?.id}`} className='noLink'>
                <div className="plus_card_img">
                  <img src={`${STATIC_HOST}/${data?.commercialImageAds[0]?.name}`} alt=""
                       className='plus_card_img-image'/>
                </div>
                <div className="plus_card_info">
                  <h1 className='plus_card_info-title'>{data?.title}</h1>
                  <h2 className='plus_card_info-address'>{data?.address}</h2>
                  <h2 className='plus_card_info-time'>{relativeDate(new Date(data?.createdAt))}</h2>
                  <h1 className='plus_card_info-price'>{numberWithSpaces(parseInt(data?.price))}<span
                    style={{fontFamily: 'Arial'}}> ₽</span></h1>
                </div>
              </NavLink>
            </div> : classname === 'l' ?
              <div className='vip_card'>
                <span className='card_favorite'><FavoriteBtn id={data?.id} isFavorite={data?.favorites}
                                                             userData={data?.user}/></span>
                <NavLink to={`/cardPage/${data?.id}`} className='noLink'>
                  <img src={`${STATIC_HOST}/${data?.commercialImageAds[0]?.name}`} alt=""
                       className='vip_card-img'/>
                </NavLink>
                <div className='flex space-between items-center'>
                  <NavLink to={`/cardPage/${data?.id}`} className='noLink'>
                    <div className="premium_card-info">
                      <h1 className='premium_card-title'>{data?.title}</h1>
                      <h1 className='premium_card-address'>{data?.address}</h1>
                      <h1 className='premium_card-time'>{relativeDate(new Date(data?.createdAt))}</h1>
                      <h1 className='premium_card-price'>{numberWithSpaces(parseInt(data?.price))}<span
                        style={{fontFamily: 'Arial'}}> ₽</span></h1>
                    </div>
                  </NavLink>
                  <div className="flex items-center premium_card-btn">
                    <NavLink state={{from: data.user, tovar: data}}
                             to={`/dialog/?adId=${data.id}&senderId=${items.id}&receiverId=${data.userId}#chat-${uuidV4()}`}>
                      <WhiteBtn size={'w-54px'} children={<img src={message_icon} alt="" className='icon'/>}/>
                    </NavLink>

                    <BlackBtn size={'w-54px'} onClick={() => setActiveModal(true)}
                              children={<img src={phone_icon} alt="" className='icon'/>}/>
                  </div>
                </div>
                <ModalTemplate activeModal={activeModal} setActiveModal={setActiveModal}
                               children={<span className='off_card-bold'>{data?.user.phone}</span>}/>
              </div> : ''
      }
    </>
  );
};

export default Card;
