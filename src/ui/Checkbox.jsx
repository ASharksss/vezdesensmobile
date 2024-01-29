import React from 'react';

const Checkbox = ({label, id}) => {
  return (
    <div className='flex'>
      <input type="checkbox" className='checkbox' id={id}/>
      <label htmlFor={id} className='checkbox_label'>{label}</label>
    </div>
  );
};

export default Checkbox;