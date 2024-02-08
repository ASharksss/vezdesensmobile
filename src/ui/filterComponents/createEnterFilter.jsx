import React from 'react';

const CreateEnterFilter = ({item, setValue}) => {
  return (
    <div className='filter_item'>
      <label className='enterFilter-title'>{item?.name}</label>
      <div className="flex">
        <input type="text" placeholder='Введите значение' className='createEnterFilter-input'
        onChange={e => setValue(e.target.value)}/>
      </div>
    </div>
  );
};

export default CreateEnterFilter;