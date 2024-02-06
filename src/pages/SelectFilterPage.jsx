import React from 'react';
import CheckboxFilter from "../ui/filterComponents/CheckboxFilter";
import Back from "../ui/Back";

const SelectFilterPage = () => {
  return (
    <div className='selectFilterPage'>
      <div className="flex items-center selectFilterPage-header">
        <Back/>
        <h1 className='filterPage-title'>Фильтры</h1>
      </div>
      <CheckboxFilter/>
    </div>
  );
};

export default SelectFilterPage;