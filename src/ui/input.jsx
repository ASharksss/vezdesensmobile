import React from 'react';

const Input = ({label, placeholder, state}) => {
	return (
		<div className='input column'>
			<label htmlFor="" className='input_label'>{label}</label>
			<input type="text" placeholder={placeholder} className={'input_form usually'}/> {/*можно error*/}
		</div>
	);
};

export default Input;