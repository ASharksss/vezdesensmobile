import React from 'react';
import phone_icon from "../asserts/board/phone_icon.svg";


const BlackBtn = ({size, children, type, btnType='button'}) => {
  return (
    <div>
      <button type={btnType} className={'phone_btn ' + size}>
        <span className={type}>{children}</span>

      </button>
    </div>
  );
};

export default BlackBtn;