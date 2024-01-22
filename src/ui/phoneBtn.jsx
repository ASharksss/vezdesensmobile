import React from 'react';
import phone_icon from '../asserts/board/phone_icon.svg'

const PhoneBtn = () => {
	return (
		<div>
			<button className='phone_btn'>
				<img src={phone_icon} alt="" className='icon'/>
			</button>
		</div>
	);
};

export default PhoneBtn;