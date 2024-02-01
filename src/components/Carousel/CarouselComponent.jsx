import React, {useEffect, useRef, useState} from 'react';
import './carousel.css'
import {STATIC_HOST} from "../../utils";
import dotActiveSVG from '../../asserts/cards/dotActive.svg';
import dotSVG from '../../asserts/cards/dot.svg';

const CarouselComponent = ({dataImages=[]}) => {
	const carouselRef = useRef(null)
	let [currentPanel, setCurrentPanel] = useState(0)

	// let currentPanel = 2
	const panelWidth = 325;
	const totalPanels = dataImages.length || 1;

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
		if (carouselRef !== null) {
			const carousel = carouselRef.current;
			carousel.style.width = `${325 * totalPanels}px)`;
		}
	}, [totalPanels,carouselRef])

	useEffect(() => {
		updateCarousel();
	}, [currentPanel])

	return (
		<div className="carousel-container">
			<div className="carousel" id="carousel" ref={carouselRef}>
				{dataImages.map((item, index) => (
					<div className="panel" key={`carousel-${index}`}>
						<img src={`${STATIC_HOST}/${item.name}`} alt={item.name}/>
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
