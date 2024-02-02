import React from 'react';
import FavoriteItem from "../components/FavoriteItem/FavoriteItem";
import settings from '../asserts/messages/setting.svg'

const FavoritePage = () => {
  return (
    <div className='favoritePage'>
      <div className="flex space-between ">
        <h1>Избранное</h1>
        <img src={settings} alt=""/>
      </div>
      <div className="favorite_list">
        <FavoriteItem/>
        <FavoriteItem/>
        <FavoriteItem/>
      </div>
    </div>
  );
};

export default FavoritePage;