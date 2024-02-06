import React from 'react';
import home_icon from '../../asserts/footer/home.svg'
import favorite_icon from '../../asserts/footer/favorite.svg'
import message_icon from '../../asserts/footer/chat.svg'
import profile_icon from '../../asserts/footer/profile.svg'
import plus_icon from '../../asserts/footer/plus.svg'
import './footer.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";


const Footer = () => {

  const {user, isAuth} = useSelector(state => state.user)

  return (

    <div className='footer'>
      <NavLink to='/'>
        <div className="footer_section">
          <img src={home_icon} alt=""/>
        </div>
      </NavLink>
      <NavLink to={isAuth ? '/favoritePage' : '/auth'}>
        <div className="footer_section">
          <img src={favorite_icon} alt=""/>
        </div>
      </NavLink>


      <div className="footer_section relative">
        <NavLink to={isAuth ? '/createAd' : '/auth'}>
          <button className='footer_section-btn'>
            <img className='footer_section-icon' src={plus_icon} alt=""/>
          </button>
        </NavLink>
      </div>

      <NavLink to={isAuth ? '/messages' : '/auth'}>
        <div className="footer_section">
          <img src={message_icon} alt=""/>
        </div>
      </NavLink>

      <NavLink to={isAuth ? `/profilePage/${user.items.id}` : '/auth'}>
        <div className="footer_section">
          <img src={profile_icon} alt=""/>
        </div>
      </NavLink>

    </div>


  );
};

export default Footer;