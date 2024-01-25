import React, {useState} from 'react';
import './myCard.css'
import image from '../../asserts/original.jpg'
import dots from '../../asserts/profile/dots.svg'
import like from '../../asserts/profile/favorite.svg'
import eye from '../../asserts/profile/eye.svg'
import MoreSubMenu from "../../ui/moreSubMenu";
import {NavLink} from "react-router-dom";

const MyCard = () => {
  const [open, setOpen] = useState(false)

  const items = [
    {
      title: 'Редактировать',
      onClick: null
    },
    {
      title: 'Снять с публикации',
      onClick: null
    }
  ]

  return (

    <>

      <div className='myCard'>
        <div className=' flex'>
          <NavLink to='/cardPage' className='noLink'>
            <div className="myCard_img">
              <img src={image} alt="" className='myCard_img-image'/>
            </div>
          </NavLink>
          <div className="myCard_info">
            <div className="myCard_info-dop flex space-between">
              <span className='myCard_info-type'>Стандарт</span>
              <img src={dots} alt="" onClick={() => setOpen(!open)}/>
            </div>
            {
              open === true ?
                <MoreSubMenu items={items} setOpen={setOpen}/> : null
            }
            <NavLink to='/cardPage' className='noLink'>
              <div className="myCard_info-main">
                <h1 className='myCard_info-title'>iPhone 14 pro max ...</h1>
                <h1 className='myCard_info-price'>109 990 ₽</h1>
              </div>

              <div className="myCard_info-footer">
                <span className=''>Осталось: </span><span className=''>23 дня </span>
                <div className="myCard_info-icons flex">
                  <div className="flex mr-20">
                    <img src={like} alt="" className='myCard_info-icon'/>
                    <span>3</span>
                  </div>
                  <div className="flex">
                    <img src={eye} alt="" className='myCard_info-icon'/>
                    <span>3</span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>


    </>


  );
};

export default MyCard;