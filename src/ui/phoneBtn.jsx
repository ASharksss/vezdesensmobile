import React from 'react';
import phone_icon from '../asserts/board/phone_icon.svg'

const PhoneBtn = ({size}) => {
	return (
		<div>
			<button className={'phone_btn ' + size}>
				<img src={phone_icon} alt="" className='icon'/>
			</button>
		</div>
	);
};

export default PhoneBtn;