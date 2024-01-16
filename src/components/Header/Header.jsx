import React from 'react';
import './header.css'
import location_icon from '../../asserts/icons/cardPage/location.svg'
import burger_icon from '../../asserts/icons/menu_burger.svg'
import search_icon from '../../asserts/icons/search.svg'


const Header = () => {
  return (
    <div className='header'>
      <div className="wrapper">
        <div className="header_location">
          <div className=" header_location-wrapper flex">
            <img className='header_location-icon' src={location_icon}/><span>Казань</span>
          </div>
        </div>
        <div className="flex header_search">
          <button className='header_search_btn'><img src={burger_icon} alt='меню'/></button>
          <div className="flex header_search_wrapper">
            <img className='header_search-icon' src={search_icon} alt=""/>
            <input className='header_search_input' placeholder='Искать объявления' type="text"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;