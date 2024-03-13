import React from 'react';
import { formatDateToRelative, relativeDate } from '../../utils';

const DialogSender = ({date, text}) => {
  return (

      <div className=' mess dialog_sender'>
        <div>
          <span className='mess_time'>{relativeDate(new Date(date))}</span>
          {/*<div className="tringle"></div>*/}
          <div className="message_block">
            {text}
          </div>
        </div>

      </div>


  );
};

export default DialogSender;