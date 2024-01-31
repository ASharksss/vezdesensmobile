import React from 'react';
import message_icon from '../asserts/board/message_icon.svg'

const WhiteBtn = ({size, children, type, btnType='button'}) => {
  return (
    <div>
      <button type={btnType} className={'message_btn ' + size}>
        <span className={type}>{children}</span>
      </button>
    </div>
  );
};

export default WhiteBtn;