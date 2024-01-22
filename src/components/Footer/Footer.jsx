import React from 'react';
import home_icon from '../../asserts/footer/home.svg'
import favorite_icon from '../../asserts/footer/favorite.svg'
import message_icon from '../../asserts/footer/chat.svg'
import profile_icon from '../../asserts/footer/profile.svg'
import plus_icon from '../../asserts/footer/plus.svg'
import './footer.css'
import {NavLink} from "react-router-dom";



const Footer = () => {
  return (
    <div className='container'>
      <div className='footer'>
        <NavLink to='/'>
          <div className="footer_section">
            <img src={home_icon} alt=""/>
          </div>
        </NavLink>

        <div className="footer_section">
          <img src={favorite_icon} alt=""/>
        </div>

        <div className="footer_section relative">
          <button className='footer_section-btn'>
            <img className='footer_section-icon' src={plus_icon} alt=""/>
          </button>

        </div>

        <div className="footer_section">
          <img src={message_icon} alt=""/>
        </div>
        <div className="footer_section">

          <img src={profile_icon} alt=""/>



        </div>

      </div>
    </div>

  );
};

export default Footer;