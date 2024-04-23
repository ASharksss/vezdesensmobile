import React, {useEffect, useState} from 'react';

const CheckboxFilter = ({item, name, id, setChoiceFilter}) => {
    const [value, setValue] = useState([])

    const handleChecked = (event) => {
        const element = parseInt(event.target.value)
        setValue((prevState) => { // проверка добавленного id-элемента
            const existingEntryIndex = prevState.findIndex((entry) => entry === element);
            if (existingEntryIndex !== -1) { // проверка имеется ли она уже во временном хранилище
                return prevState.filter((entry) => entry !== element); // если да, то удаляем
            } else {
                return [...prevState, element]; // если нет, то добавляем
            }
        });
    }
    useEffect(() => {
        if (value.length > 0) {
            setChoiceFilter((prevState) => { // те же самые проверки, только запись на родительский стейт
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
        if (value.length === 0) {
            const removeById = (arr) => {
                const updatedArr = arr.filter(item => item.id !== id);
                return updatedArr;
            };
            setChoiceFilter((prevState) => removeById(prevState))
        }
    }, [id, value]);

    return (
        <div className='filter_item'>
            <h1 className='enterFilter-title'>{name}</h1>
            <div className="flex column">
                {item?.map(value => (
                    <div className='flex items-center' key={`checkbox-${value.id}`}>
                        <input type='checkbox' id={value?.id} name='category'
                               value={value?.id} className='checkbox_input'
                               onChange={handleChecked}
                        />
                        <label htmlFor={value?.id} className='checkboxFilter_label'>{value?.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxFilter;