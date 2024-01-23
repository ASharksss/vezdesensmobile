import React from 'react';
import avatar from '../asserts/profile/empty_avatar6969.svg'
import dots from '../asserts/profile/dots.svg'
import ReviewStars from "../ui/ReviewStars";
import MyCard from "../components/MyCard/MyCard";


const ProfilePage = () => {
  return (
    <div className='container'>

      <div className='profile'>
        <div>
          <div className="profile_info flex space-between">
            <div className='flex items-center'>
              <div className="profile_info-avatar">
                <img src={avatar} alt=""/>
              </div>
              <div className="profile_info-text">
                <h1 className='profile_info-name'>Курбналаиева Алсу</h1>
                <p className='profile_info-phone'>+7 919 657-35-11</p>
              </div>
            </div>
            <div className="profile_info-icon">
              <span><img src={dots} alt=""/></span>
            </div>
          </div>
          <div className="profile_reviews">
            <ReviewStars/>
          </div>
          <div className="profile_cards">
            <h1 className='profile_cards-title'>Мои объявления</h1>
            <div className='flex'>
              <span>Активные</span>
              <span>Архив</span>
            </div>
            <input type="text" className='profile_search' placeholder='Поиск'/>
            <MyCard/>
            <MyCard/>
            <MyCard/>
            <MyCard/>
            <MyCard/>
            <MyCard/>
          </div>

        </div>
      </div>
    </div>

  );
};

export default ProfilePage;