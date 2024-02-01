import React, {useEffect, useRef, useState} from 'react';
import './carousel.css'
import dotActiveSVG from '../../asserts/cards/dotActive.svg';
import dotSVG from '../../asserts/cards/dot.svg';
import {type} from "@testing-library/user-event/dist/type";

const CarouselComponent = () => {
	const carouselRef = useRef(null)
	let [currentPanel, setCurrentPanel] = useState(0)

	// let currentPanel = 2
	const panelWidth = 325;
	const totalPanels = 4;

	function changePanel(index) {
		setCurrentPanel(index)
		updateCarousel();
	}
	const data = [...Array(totalPanels)].map((item, index) => ({name: `test-${index}`}))

	function updateCarousel() {
		if (carouselRef !== null) {
			const carousel = carouselRef.current;
			const panelContainer = document.querySelector('.carousel-container');
			const translateValue = -panelWidth * currentPanel;
			carousel.style.transform = `translateX(${translateValue}px)`;
			panelContainer.style.width = `${panelWidth}px`;
		}
	}

	useEffect(() => {
		updateCarousel();
	}, [currentPanel])

	return (
		<div className="carousel-container">
			<div className="carousel" id="carousel" ref={carouselRef}>
				{data.map((item, index) => (
					<div className="panel" key={`carousel-${index}`}>
						<h1>{item.name}</h1>
					</div>
				))}
			</div>
			<div className='dots'>
				{[...Array(totalPanels)].map((item, index) => (
					<>
						{index === currentPanel ? <img style={{padding: 10}} src={dotActiveSVG} alt="Активный"/> : null}
						{index !== currentPanel ? <img style={{padding: 10}} src={dotSVG} alt="Картинка" onClick={() => changePanel(index)}/> : null}
					</>
				))}
			</div>
		</div>
	);
};

export default CarouselComponent;
