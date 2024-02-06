import React from 'react';

const CreateEnterFilter = () => {
  return (
    <div className='filter_item'>
      <label className='enterFilter-title'>Название</label>
      <div className="flex">
        <input type="text" placeholder='Введите значение' className='createEnterFilter-input'/>
      </div>
    </div>
  );
};

export default CreateEnterFilter;