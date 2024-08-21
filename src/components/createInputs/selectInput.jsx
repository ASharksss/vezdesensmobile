import React, {useEffect, useState} from 'react';

const SelectInput = ({data, setSelectValue, id, isRequired = false, mainValue = ''}) => {

	const [value, setValue] = useState(mainValue)

	useEffect(() => {
		if (value !== '') {
			setSelectValue((prevState) => {
				const existingEntryIndex = prevState.findIndex((entry) => entry.id === id);
				if (existingEntryIndex !== -1) {
					const updatedEnterValue = [...prevState];
					updatedEnterValue[existingEntryIndex] = {id: id, value: parseInt(value)};
					return updatedEnterValue;
				} else {
					return [...prevState, {id: id, value: parseInt(value)}];
				}
			})
		}
		if (value.length === 0) {
			const removeById = (arr) => {
				const updatedArr = arr.filter(item => item.id !== id);
				return updatedArr;
			};
			setSelectValue((prevState) => removeById(prevState))
		}
	}, [id, value]);

	return (
		<div className='characteristic_item'>
			<label className='characteristic_item-label'>{data.name}</label>
			<select className='createCard_select' required={isRequired}
			        onChange={e => setValue(e.target.value)} value={mainValue}>
				<option value='' hidden={!isRequired}>Выберите значение</option>
				{
					data.characteristicValues.map(value => (
						<option value={value.id} data-name={value.name}>{value.name}</option>
					))
				}
			</select>
		</div>
	);
};

export default SelectInput;