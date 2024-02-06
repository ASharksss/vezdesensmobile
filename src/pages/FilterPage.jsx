import React from 'react';
import Back from "../ui/Back";
import EnterFilter from "../ui/filterComponents/enterFilter";
import SelectFilter from "../ui/filterComponents/selectFilter";
import CheckboxFilter from "../ui/filterComponents/CheckboxFilter";

const FilterPage = () => {
  return (
    <div className='filterPage'>
      <div className="flex items-center">
        <Back/>
        <h1 className='filterPage-title'>Фильтры</h1>
      </div>
      <h1 className='filterPage-category'>Категория</h1>
      <EnterFilter/>
      <SelectFilter/>
      <CheckboxFilter/>
    </div>
  );
};

export default FilterPage;