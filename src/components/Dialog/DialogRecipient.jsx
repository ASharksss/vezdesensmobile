import React from 'react';
import { relativeDate } from '../../utils';

const DialogRecipient = ({date, text}) => {
  return (

    <div className='mess dialog_recipient'>

      <div className=''>
        <span className='mess_time '>{relativeDate(new Date(date))}</span>
        {/* <div className="tringle"></div> */}
        <div className="message_block">
          {text}
        </div>
      </div>

    </div>

  );
};

export default DialogRecipient;