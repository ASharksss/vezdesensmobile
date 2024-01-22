import React from 'react';
import './pages.css'
import Card from "../components/Card/Card";
import Long from "../components/Card/Long";
import Premium from "../components/Card/Premium";
import Vip from "../components/Card/Vip";

const BoardPage = () => {
	return (
		<div className='board_page'>
			<Premium/>
			<div className="grid">
				<Card/>
				<Card/>
				<Card/>
				<Card/>
				<Card/>
				<Card/>
				<Card/>
			</div>
			<Long/>
			<div className="grid">
				<Card/>
				<Card/>
				<Card/>
				<Card/>

				<Card/>
				<Card/>
				<Card/>
			</div>
			<Vip/>

		</div>
	);
};

export default BoardPage;