import React from 'react';
import premium_img from "../../asserts/cards/premium_img.png";
import MessageBtn from "../../ui/messageBtn";
import PhoneBtn from "../../ui/phoneBtn";
import vip_image from '../../asserts/board/vip_image.png'

const Vip = () => {
	return (
		<div className='vip_card'>
			<img src={vip_image} alt="" className='vip_card-img'/>
			<div className='flex space-between items-center'>
				<div className="premium_card-info">
					<h1 className='premium_card-title'>Массажёр для глаз</h1>
					<h1 className='premium_card-address'>Казань, Проспект Победы</h1>
					<h1 className='premium_card-time'>Сегодня 11:32</h1>
					<h1 className='premium_card-price'>5000 ₽</h1>
				</div>
				<div className="flex items-center premium_card-btn">
					<MessageBtn/>
					<PhoneBtn/>
				</div>
			</div>
		</div>
	);
};

export default Vip;