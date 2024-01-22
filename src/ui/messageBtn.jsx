import React from 'react';
import message_icon from '../asserts/board/message_icon.svg'

const MessageBtn = () => {
	return (
		<div>
			<button className='message_btn'>
				<img src={message_icon} alt="" className='icon'/>
			</button>
		</div>
	);
};

export default MessageBtn;