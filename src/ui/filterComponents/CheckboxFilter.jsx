import React, {useState} from 'react';

const CheckboxFilter = ({item, setValue, setOpen}) => {


  return (
    <div className='filter_item'>
      {/*     <h1 className='enterFilter-title'>Навзваие</h1>*/}
      <div className="flex items-center checkbox_item">
        <input type="radio" id={item?.id} name='category'
               value={item?.id} className='checkbox_input'
               onChange={() => {
                 setValue(item)
                 setOpen(false)
               }}
        />
        <label htmlFor={item?.id} className='checkboxFilter_label'>{item?.name}</label>
      </div>
    </div>
  );
};

export default CheckboxFilter;