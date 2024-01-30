import React from 'react';
import './style.css'
import StarComponent from "./StarComponents";
import avatar from '../../asserts/review_avatar.svg'

const ReviewPerson = () => {
  return (
    <div className='reviewPerson'>
      <div className="flex items-center">
        <img src={avatar} alt="" className='reviewPerson-avatar'/>
        <div className='review_info'>
          <h1 className='reviewPerson-title'>Петров Петр Иванович</h1>
          <span className='reviewPerson-time'>5 января, 20:11</span>

        </div>
      </div>
      <div className="reviewPerson-stars">
        <StarComponent average={5} width={15}/>
      </div>
      <p className='reviewPerson-description'>
        Школа опрятная, техничка вежливая, есть интересная спортивная площадка.
        Ребёнок ходит, вроде доволен Школа опрятная, техничка вежливая, есть интересная
        спортивная площадка. Ребёнок ходит, вроде доволен.
      </p>
    </div>
  );
};

export default ReviewPerson;