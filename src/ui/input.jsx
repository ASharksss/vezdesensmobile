import React from 'react';

const Input = ({label, placeholder}) => {
	return (
		<div className='input column'>
			<label htmlFor="" className='input_label'>{label}</label>
			<input type="text" placeholder={placeholder} className='input_form'/>
		</div>
	);
};

export default Input;