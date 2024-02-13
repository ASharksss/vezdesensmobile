import React, {useEffect, useRef, useState} from 'react';
import './carousel.css'
import {STATIC_HOST} from "../../utils";
import dotActiveSVG from '../../asserts/cards/dotActive.svg';
import dotSVG from '../../asserts/cards/dot.svg';

const CarouselComponent = ({dataImages=[]}) => {
	const carouselRef = useRef(null)
	let [currentPanel, setCurrentPanel] = useState(0)
	let [positionY, setPositionY] = useState(null)
	let [positionX, setPositionX] = useState(null)

	const panelWidth = 325;
	const totalPanels = dataImages.length || 1;

	function changePanel(index) {
		setCurrentPanel(index)
		updateCarousel();
	}

	function updateCarousel() {
		if (carouselRef !== null) {
			const carousel = carouselRef.current;
			const translateValue = -panelWidth * currentPanel;
			carousel.style.transform = `translateX(${translateValue}px)`;
		}
	}

	const handleTouchStart = (event) => {
		const firstTouch = event.touches[0]
		setPositionY(firstTouch.clientY)
		setPositionX(firstTouch.clientX)
	}
	const handleTouchMove = (event) => {
		if (!positionY) return false;
		let nextPositionY = event.touches[0].clientY
		let nextPositionX = event.touches[0].clientX
		let xDiff = nextPositionX - positionX
		let yDiff = nextPositionY - positionY
		if (Math.abs(xDiff) > Math.abs(yDiff)) {
			if (xDiff < 0) {
				if ((currentPanel + 1) !== totalPanels) {
					setCurrentPanel(currentPanel + 1)
				} else {
					setCurrentPanel(0)
				}
			}
			else {
				if (currentPanel !== 0) {
					setCurrentPanel(currentPanel - 1)
				} else {
					setCurrentPanel(totalPanels - 1)
				}
			}
		}
		setPositionX(null)
		setPositionY(null)
	}

	useEffect(() => {
		if (carouselRef !== null) {
			carouselRef.current.style.width = `${325 * totalPanels}px`;
		}
	}, [totalPanels,carouselRef])

	useEffect(() => {
		updateCarousel();
	}, [currentPanel])

	return (
		<div className="carousel-container">
			<div className="carousel" id="carousel" ref={carouselRef}
			onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
				{dataImages.map((item, index) => (
					<div className="panel" key={`carousel-${index}`}>
						<img src={`${STATIC_HOST}/${item.name}`} alt={item.name} data-fancybox="gallery" className='card_page-img'/>
					</div>
				))}
			</div>
			<div className='dots'>
				{[...Array(totalPanels)].map((item, index) => (
					<React.Fragment key={`carouselDot-${index}`}>
						{index === currentPanel ? <img style={{padding: 5}} src={dotActiveSVG} alt="Активный"/> : null}
						{index !== currentPanel ? <img style={{padding: 5}} src={dotSVG} alt="Картинка" onClick={() => changePanel(index)}/> : null}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default CarouselComponent;
