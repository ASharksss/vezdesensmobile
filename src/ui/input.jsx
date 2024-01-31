import React from 'react';

const Input = ({label, placeholder, state, onChangeValue, value, required = false, typeInput = 'text'}) => {
  return (
    <div className='input column'>
      <label htmlFor="" className='input_label'>{label}</label>
      <input type={typeInput} placeholder={placeholder} className={'input_form usually'} value={value}
             onChange={e => onChangeValue(e.target.value)}
             required={required}
      />
    </div>
  );
};

export default Input;