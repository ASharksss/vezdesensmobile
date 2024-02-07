import React from 'react';

const CheckboxFilter = ({items}) => {

  return (
    <div className='filter_item'>
      <h1 className='enterFilter-title'></h1>
      {
        items !== undefined ?
        items.map((item) => (
          <div className="flex items-center checkbox_item" key={item.id}>
            <input type="checkbox" value={item.id} id={item.id} className='checkbox_input'
            />
            <label htmlFor={item.id} className='checkboxFilter_label'>{item.name}</label>
          </div>
        )) : null
      }

    </div>
  );
};

export default CheckboxFilter;