import React from 'react';
import preview_standart from "../../asserts/createCard/preview_standart.svg";


const SizeBlock = ({preview, setPreview, preview_image, name, price, description, setSelectedSize}) => {
	return (
		<div className='size_block'>
			<div className="flex items-center">
				<input type="radio" className='mob-input' name='size_block' id={name}
				       checked={name === preview.name} onChange={() => {
					setSelectedSize(name)
					setPreview({isOpen: true, name: name})
				}}/>
				<label htmlFor={name}>
					<div>
						<div className="flex items-center">
							<span className='size_standart-name'>{name}</span>
							<span className='size_standart-price'>{price}</span>
						</div>
						<p className='size_standart-description'>{description}</p>
						{/*<p className='size_standart-btn' onClick={() => {*/}
						{/*	setPreview({isOpen: !preview.isOpen, name: name})*/}
						{/*	setSelectedSize(name)*/}
						{/*}}>Предпросмотр</p>*/}
					</div>
				</label>
			</div>
			{
				preview.isOpen && preview.name === name ?
					<>
					<p className='size_standart-btn'>Предпросмотр</p>
					<img src={preview_image} alt="" className='size_standart-preview'/>
					</>
					: null
			}

		</div>
	);
};

export default SizeBlock;