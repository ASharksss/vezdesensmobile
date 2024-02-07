import React, {useState} from 'react';
import './myCard.css'
import dots from '../../asserts/profile/dots.svg'
import like from '../../asserts/profile/favorite.svg'
import eye from '../../asserts/profile/eye.svg'
import MoreSubMenu from "../../ui/moreSubMenu";
import {NavLink} from "react-router-dom";
import ModalTemplate from "../Modal/ModalTemplate";
import OffCard from "../Modal/OffCard";
import {pluralRusVariant, STATIC_HOST} from "../../utils";

const MyCard = ({item, choice}) => {
  const [open, setOpen] = useState(false)

  const [activeModal, setActiveModal] = useState(false)
  let items = []

  if (choice === 'active') {
    items = [
      {
        title: 'Редактировать',
        onClick: null
      },
      {
        title: 'Снять с публикации',
        onClick: () => setActiveModal(true)
      }
    ]
  } else {
    items = [
      {
        title: 'Активировать',
        onClick: null
      },
      {
        title: 'Удалить',
        onClick: () => null
      },
      {
        title: 'Редактировать',
        onClick: () => null
      }
    ]
  }


  return (

    <>

      <div className='myCard'>
        <div className=' flex'>
          <NavLink to={`/cardPage/${item.id}`} className='noLink'>
            <div className="myCard_img">
              <img src={`${STATIC_HOST}/${item?.previewImageAds[0]?.name}`} alt=""
                   className='myCard_img-image'/>
            </div>
          </NavLink>
          <div className="myCard_info">
            <div className="myCard_info-dop flex space-between">
              <span className='myCard_info-type'>{item.typeAd.name}</span>
              <img src={dots} alt="" onClick={() => setOpen(!open)}/>
            </div>
            {
              open ?
                <MoreSubMenu items={items} setOpen={setOpen}/> : null
            }
            <NavLink to={`/cardPage/${item.id}`} className='noLink'>
              <div className="myCard_info-main">
                <h1 className='myCard_info-title'>{item.title}</h1>
                <h1 className='myCard_info-price'>{item.price}</h1>
              </div>

              <div className="myCard_info-footer">
                <span className=''>Осталось: </span><span
                className=''>{new Date(new Date(item.dateEndActive) - new Date()).getDate()} {["день", "дня", "дней"][pluralRusVariant(new Date(new Date(item.dateEndActive) - new Date()).getDate())]}</span>
                <div className="myCard_info-icons flex">
                  <div className="flex mr-20">
                    <img src={like} alt="" className='myCard_info-icon'/>
                    <span>{item.favoritesCount}</span>
                  </div>
                  <div className="flex">
                    <img src={eye} alt="" className='myCard_info-icon'/>
                    <span>{item.views}</span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <ModalTemplate children={<OffCard/>} activeModal={activeModal} setActiveModal={setActiveModal}/>
    </>


  );
};

export default MyCard;
