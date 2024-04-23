import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Back from "../ui/Back";
import EnterFilter from "../ui/filterComponents/enterFilter";
import CheckboxFilter from "../ui/filterComponents/CheckboxFilter";
import {setQuery} from "../redux/slices/CategoryFilterSlice";

const FilterPage = ({setShowFilter}) => {

    const dispatch = useDispatch()
    const {filters, status} = useSelector(state => state.categoryFilter)
    const isLoading = status === 'loading'

    const [choiceFilter, setChoiceFilter] = useState([]);
    const [enterFilter, setEnterFilter] = useState([]);

    const handleCloseFilter = () => setShowFilter(false)
    const handleSubmit = (event) => {
        event.preventDefault();
        let queryValue = ''
        if (choiceFilter.length > 0) {
            choiceFilter.map(item => {
                if (item.value.length > 1) {
                    queryValue += `${item.id}=[${item.value}], `
                } else {
                    queryValue += `${item.id}=${item.value}, `
                }
            })
        }
        if (enterFilter.length > 0) {
            enterFilter.map(item => {
                queryValue += `${item.id}=${item.value}, `
            })
        }
        dispatch(setQuery(queryValue === '' ? null : queryValue.slice(0, -2)))
        setShowFilter(false)
    }
    if (isLoading) {
        return <p>Загрузка...</p>
    }
    return (
        <form className='filterPage' onSubmit={handleSubmit}>
            <div className="flex items-center">
                <Back handleClick={handleCloseFilter}/>
                <h1 className='filterPage-title'>Фильтры</h1>
            </div>
            <h1 className='filterPage-category'>Категория</h1>
            <EnterFilter setEnterFilter={setEnterFilter}/>
            {filters.map(item => (
                item.characteristic.typeCharacteristic.name === 'enter' ?
                    <EnterFilter name={item.characteristic.name} id={item.characteristic.id} setEnterFilter={setEnterFilter}/> :
                    // item.characteristic.typeCharacteristic.name === 'select' ?
                    //     <SelectFilter name={item.characteristic.name}/> :
                        <CheckboxFilter item={item.characteristic.characteristicValues}
                        name={item.characteristic.name} id={item.characteristic.id} setChoiceFilter={setChoiceFilter}/>
            ))}
            <div className='filterPage-show-container'>
                <button type='submit' className='filterPage-show-btn'>Показать</button>
            </div>
        </form>
    );
};

export default FilterPage;