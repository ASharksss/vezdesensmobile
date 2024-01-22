import React from 'react';
import './pages.css'
import Card from "../components/Card/Card";

const BoardPage = () => {
	return (
		<div className='board_page'>
			<div className="grid">
				<Card/>
				<Card/>
				<Card/>
				<Card/>
				<Card/>
				<Card/>
				<Card/>
			</div>

		</div>
	);
};

export default BoardPage;