import React from 'react';
import './cards.css'
import card_img from '../../asserts/card_img.png'
import {NavLink} from "react-router-dom";


const Card = () => {
	return (
		<div className='card'>
			<NavLink to='/cardPage' className='noLink'>
				<div className="card_img">
					<img src={card_img} alt="" className='card_img-image'/>
				</div>
				<div className="card_info">
					<h1 className='card_info-title'>Массажёр для глаз</h1>
					<h2 className='card_info-address'>Казань, Проспект Победы</h2>
					<h2 className='card_info-time'>Сегодня 11:32</h2>
					<h1 className='card_info-price'>5000 ₽</h1>
				</div>
			</NavLink>
		</div>
	);
};

export default Card;