import React from 'react';
import arrow from '../asserts/icons/similiar_arrow.svg'


const SimilarBtn = () => {
  return (
    <div className='similar_btn'>
      <button className='flex items-center'>
        Похожие
        <img src={arrow} alt="" className='similar_btn-arrow'/>
      </button>
    </div>
  );
};

export default SimilarBtn;