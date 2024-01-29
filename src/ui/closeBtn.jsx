import React from 'react';
import cross from '../asserts/icons/cross_icon.svg'


const CloseBtn = ({handleClick}) => {
  return (
    <div onClick={() => handleClick()}>
      <img src={cross} alt=""/>
    </div>
  );
};

export default CloseBtn;