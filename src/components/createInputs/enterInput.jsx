import React, {useEffect, useState} from 'react';

const EnterInput = ({data, setEnterValue, id, isRequired, mainValue=''}) => {
	const [value, setValue] = useState(mainValue)
	useEffect(() => {
		if (value !== '') {
			setEnterValue((prevState) => {
				const existingEntryIndex = prevState.findIndex((entry) => entry.id === id);
				if (existingEntryIndex !== -1) {
					const updatedEnterValue = [...prevState];
					updatedEnterValue[existingEntryIndex] = {id: id, value: value};
					return updatedEnterValue;
				} else {
					return [...prevState, {id: id, value: value}];
				}
			})
		}
		if(value === '') {
			const removeById = (arr) => {
				const updatedArr = arr.filter(item => item.id !== id);
				return updatedArr;
			};
			setEnterValue((prevState) => removeById(prevState))
		}
	}, [id, value]);
	return (
		<div className='characteristic_item'>
			<label className='characteristic_item-label'>{data.name}</label>
			<input onChange={e => setValue(e.target.value)} value={value}
			       type="text" className='createCard_characteristics-input'/>
		</div>
	);
};

export default EnterInput;