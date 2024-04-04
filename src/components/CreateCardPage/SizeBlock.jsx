import React from 'react';
import preview_standart from "../../asserts/createCard/preview_standart.svg";

const SizeBlock = ({preview, setPreview, preview_image, name, price, description}) => {
  return (
    <div className='size_block'>
      <div className="flex items-center">
        <input type="checkbox" className='size_standart-checkbox'/>
        <div>
          <div className="flex items-center">
            <span className='size_standart-name'>{name}</span>
            <span className='size_standart-price'>{price}</span>
          </div>
          <p className='size_standart-description'>{description}</p>
          <p className='size_standart-btn' onClick={() => {
            setPreview({isOpen: !preview.isOpen, name: name})
          }}>Предпросмотр</p>
        </div>
      </div>
      {
        preview.isOpen && preview.name === name ?
          <img src={preview_image} alt="" className='size_standart-preview'/>
          : null
      }

    </div>
  );
};

export default SizeBlock;