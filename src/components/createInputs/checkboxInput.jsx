import React, {useEffect, useState} from 'react';

const CheckboxInput = ({data, setCheckboxValue, id, isRequired = false, mainValue = []}) => {
	const [items, setItems] = useState(mainValue) // для хранения временных id
	const handleChangeCheckbox = (event) => {
		const element = parseInt(event.target.dataset.id)
		setItems((prevState) => { // проверка добавленного id-элемента
			const existingEntryIndex = prevState.findIndex((entry) => entry === element);
			if (existingEntryIndex !== -1) { // проверка имеется ли она уже во временном хранилище
				return prevState.filter((entry) => entry !== element); // если да, то удаляем
			} else {
				return [...prevState, element]; // если нет, то добавляем
			}
		});
	};
	useEffect(() => {
		if (items.length > 0) {
			setCheckboxValue((prevState) => { // те же самые проверки, только запись на родительский стейт
				const existingEntryIndex = prevState.findIndex((entry) => entry.id === id);
				if (existingEntryIndex !== -1) {
					const updatedEnterValue = [...prevState];
					updatedEnterValue[existingEntryIndex] = {id: id, value: items};
					return updatedEnterValue;
				} else {
					return [...prevState, {id: id, value: items}];
				}
			})
		}
		if (items.length === 0) {
			const removeById = (arr) => {
				const updatedArr = arr.filter(item => item.id !== id);
				return updatedArr;
			};
			setCheckboxValue((prevState) => removeById(prevState))
		}
	}, [id, items]);

	return (
		<div className='characteristic_item'>
			<label className='characteristic_item-label'>{data.name}</label>
			<label>{
				data.characteristicValues.map(value => (
					<div className='characteristic_item-values '>
						<input className='characteristic_item-checkbox' type="checkbox" value={value.id}
						       onChange={handleChangeCheckbox} id={`checkbox-${value.name}=${value.id}`} data-id={value.id}
						       checked={items.includes(value.id)}/>
						<label className='characteristic_item-text' htmlFor={`checkbox-${value.name}=${value.id}`}>{value.name}</label>
					</div>
				))
			}</label>
		</div>
	);
};

export default CheckboxInput;