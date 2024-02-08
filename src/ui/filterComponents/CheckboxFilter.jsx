import React, {useState} from 'react';

const CheckboxFilter = ({item, setValue, type = "checkbox"}) => {
  return (
    <div className='filter_item'>
      <h1 className='enterFilter-title'>{item?.name}</h1>
      <div className="flex items-center checkbox_item">
        {item?.map(value => (
          <>
            <input type={type} id={value?.id} name='category'
                   value={value?.id} className='checkbox_input'
                   onChange={() => {
                     setValue(value)
                   }}
            />
            <label htmlFor={value?.id} className='checkboxFilter_label'>{value?.name}</label>
          </>
        ))}
      </div>
    </div>
  );
};

export default CheckboxFilter;