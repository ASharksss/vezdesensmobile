import React from 'react';
import './favoriteItem.css'
import FavoriteBtn from "../../ui/favoriteBtn";
import {pluralRusVariant, relativeDate, STATIC_HOST} from "../../utils";
import {NavLink} from "react-router-dom";


const FavoriteItem = ({data}) => {
  return (
    <div className='favorite_item'>

      <div className="flex">

        <img src={`${STATIC_HOST}/${data.ad?.previewImageAds[0]?.name}`} alt="" className='favorite_image'/>
        <div className="favorite_info">
          <div className="flex items-center center">
            <span className='favorite_category'>Электроника</span>
            <FavoriteBtn id={data.ad.id} isFavorite={true}/>
          </div>
          <NavLink to={`/cardPage/${data.ad.id}`} className='noLink'>
            <h1 className='favorite_title'>{data.ad.title}</h1>
          </NavLink>
          <h2 className='favorite_price'>{data.ad.price}</h2>
          <div className="column">
            <span className='favorite_status'>{data.ad.statusAd.name}</span>
            <span className='favorite_time'>{relativeDate(new Date(data?.ad.createdAt))}</span>
            <span className='favorite_views'>
              {data.ad.views} {`${["просмотр", "просмотра", "просмотров"][pluralRusVariant(parseInt(data.ad.views))]}`}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FavoriteItem;