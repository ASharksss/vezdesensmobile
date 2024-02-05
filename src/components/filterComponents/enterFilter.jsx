import React from 'react';
import './style.css'

const EnterFilter = () => {
  return (
    <div className='filter_item'>
      <label className='enterFilter-title'>Название</label>
      <div className="flex">
        <input type="text" placeholder='от' className='enterFilter-input'/>
        <input type="text" placeholder='до' className='enterFilter-input'/>
      </div>
    </div>
  );
};

export default EnterFilter;