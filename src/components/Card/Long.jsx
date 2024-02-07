import React from 'react';
import long_img from '../../asserts/cards/LongImg.svg'

const Long = ({image, href}) => {
  return (
    <>

        <div >
          <a href={href} target='_blank'>
            <img src={image} alt="" className='long_img'/>
          </a>
        </div>

    </>

  );
};

export default Long;