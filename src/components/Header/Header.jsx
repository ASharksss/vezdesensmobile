import React, {useEffect, useRef, useState} from 'react';
import './header.css'
import location_icon from '../../asserts/cardPage/location.svg'
import burger_icon from '../../asserts/icons/menu_burger.svg'
import search_icon from '../../asserts/icons/search.svg'
import CategoryItem from "../CategoryItem/CategoryItem";


const Header = () => {
  const wrapperRef = useRef(null)

  const [openCategory, setOpenCategory] = useState(false)

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target))
      setOpenCategory(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (

    <div className={'header header_shadow'} ref={wrapperRef}>
      <div className="wrapper">
        <div className="header_location">
          <div className=" header_location-wrapper flex">
            <img className='header_location-icon' src={location_icon}/><span>Казань</span>
          </div>
        </div>
        <div className="flex header_search">
          {
            openCategory ?
              <button className='header_search_btn_white' onClick={() => {
                setOpenCategory(!openCategory)

              }}>
                <img src={burger_icon} alt='меню'/>
              </button>
              :
              <button className='header_search_btn' onClick={() => setOpenCategory(!openCategory)}>
                <img src={burger_icon} alt='меню'/>
              </button>
          }

          <div className="flex header_search_wrapper">
            <img className='header_search-icon' src={search_icon} alt=""/>
            <input className='header_search_input' placeholder='Искать объявления' type="text"/>
          </div>


        </div>
      </div>
      {
        openCategory ?
          <div className='category_list'>
            <CategoryItem address={'subCategory'}/>
            <CategoryItem address={'subCategory'}/>
            <CategoryItem address={'subCategory'}/>
            <CategoryItem address={'subCategory'}/>
            <CategoryItem address={'subCategory'}/>
            <CategoryItem address={'subCategory'}/>

          </div> : null
      }

    </div>


  );
};

export default Header;