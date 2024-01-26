import React from 'react';
import message_icon from '../asserts/board/message_icon.svg'

const MessageBtn = ({size}) => {
	return (
		<div>
			<button className={'message_btn ' + size}>
				<img src={message_icon} alt="" className='icon'/>
			</button>
		</div>
	);
};

export default MessageBtn;