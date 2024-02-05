import React from 'react';

const CheckboxFilter = () => {
  return (
    <div className='filter_item'>
      <h1 className='enterFilter-title'>Название</h1>
      <div className="flex items-center checkbox_item">
        <input type="checkbox" value='Значение' className='checkbox_input'/>
        <label className='checkboxFilter_label'>Значение</label>
      </div>
      <div className="flex items-center checkbox_item">
        <input type="checkbox" value='Значение' className='checkbox_input'/>
        <label className='checkboxFilter_label'>Значение</label>
      </div>
      <div className="flex items-center checkbox_item">
        <input type="checkbox" value='Значение' className='checkbox_input'/>
        <label className='checkboxFilter_label'>Значение</label>
      </div>
    </div>
  );
};

export default CheckboxFilter;