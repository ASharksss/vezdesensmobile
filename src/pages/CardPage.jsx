import React from 'react';
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './pages.css'
import er from '../asserts/er.jpg'
import on from '../asserts/on.jpg'
import original from '../asserts/original.jpg'
import back_icon from '../asserts/cardPage/back_arrow.svg'
import share_icon from '../asserts/cardPage/share.svg'
import favorite_icon from '../asserts/cardPage/favorite.svg'
import phone_icon from '../asserts/cardPage/phone_white.svg'
import message_icon from '../asserts/cardPage/message_black.svg'

import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Backbtn from "../ui/Backbtn";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";

const CardPage = () => {
  const navigate = useNavigate()

  return (
    <div className='card_page'>
      <div className='wrapper'>
        <div className="card_header">
          <div className="flex space-between">
            <img src={back_icon} alt="" onClick={() => navigate(-1)}/>
            <div className="flex">
              <img className='card_icon' src={share_icon} alt=""/>
              <img className='card_icon' src={favorite_icon} alt=""/>
            </div>
          </div>
        </div>
        <div className="breadcrumbs">
          <Breadcrumbs/>
        </div>
        <div className="card_images">
          {/* <Carousel renderThumbs={()=>{}} emulateTouch={true} animationHandler={"fade"} infiniteLoop={true}>
            <div>
              <img className='card_images_img' src={er} alt=""/>
            </div>
            <div>
              <img className='card_images_img' src={on} alt=""/>
            </div>
            <div>
              <img className='card_images_img' src={original} alt=""/>
            </div>
          </Carousel>*/}
          <img className='card_images_img' src={original} alt="" />

        </div>
        <h1 className='card_title'>iPhone 14 pro max 256gb</h1>
        <h2 className='card_price'>109 990 ₽</h2>

        <div className="card_seller_info">
          <NavLink to='/profilePage'>
            <h1 className='card_seller-title'>AppleMania</h1>
          </NavLink>
          <div className="flex card_reviews">
            <span className='card_reviews-stars'>Рейтинг</span>
            <span>31 отзыв</span>
          </div>
        </div>
        <span className='card_seller-address'>
              Республика Татарстан, Казань, Петербургская ул., 9
        </span>

        <div className="card_btns">
          <button className='black_btn'><img src={phone_icon} alt=""/></button>
          <button className='white_btn'><img src={message_icon} alt=""/></button>
        </div>

        <div className="card_description">
          <h1 className="card_description-title">Описание</h1>
          <p className='card_description-text'>
            iPhone 14 pro max + Фирменный подарок!
            ГАРАНТИЯ !
            КРЕДИТ БЕЗ ПЕРВОНАЧАЛЬНОГО ВЗНОСА !
            Абсолютно новый ( НЕ ВОССТАНОВЛЕННЫЙ ) в заводской упаковке iPhone 14 Pro Max Deep Purple !
            🌐🌐🌐🌐🌐
            📱MQ993J/A
            1 физическая сим-карта и 2 е-сим
            🌐🌐🌐🌐🌐
            ▪️ОПЛАТА:💵Наличный расчёт
            📲Перевод с карты на карту СБП💳 Безналичный расчёт ( Через терминал + 1.5% к стоимости )⏳А также можно
            приобрести в кредит через банки . ( Условия: паспорт РФ, прописка )
            🧑🏻‍💻Работаем с ЮР лицами и ИП ❗️БЕЗ НДС❗️
          </p>
        </div>
        <div className="card_backbtn">
          <Backbtn/>
        </div>

        <div className="card_statistic">
          <p className='card_statistic-text'><span>№ 2571607180</span> · <span>сегодня в 13:04</span></p>
          <p className='card_statistic-text'>1666 просмотров (+2 сегодня)</p>
        </div>

      </div>
    </div>

  );
};

export default CardPage;