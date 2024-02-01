import React from 'react';
import './style.css'
import StarComponent from "./StarComponents";
import avatar from '../../asserts/review_avatar.svg'
import {AVATAR_HOST, formatDateToRelative} from "../../utils";

const ReviewPerson = ({item}) => {
  return (
    <div className='reviewPerson'>
      <div className="flex items-center">
        <img src={`${AVATAR_HOST}/${item.user.userAvatars[0]?.name}`} alt="" className='reviewPerson-avatar'/>
        <div className='review_info'>
          <h1 className='reviewPerson-title'>{item.user.name}</h1>
          <span className='reviewPerson-time'>{formatDateToRelative(new Date(item.createdAt))}</span>

        </div>
      </div>
      <div className="reviewPerson-stars">
        <StarComponent average={item.grade} width={15}/>
      </div>
      <p className='reviewPerson-description'>
        {item.text}
      </p>
    </div>
  );
};

export default ReviewPerson;
