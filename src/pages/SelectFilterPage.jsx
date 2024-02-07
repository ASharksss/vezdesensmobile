import React from 'react';
import CheckboxFilter from "../ui/filterComponents/CheckboxFilter";
import Back from "../ui/Back";
import {useLocation} from "react-router";

const SelectFilterPage = () => {

  const location = useLocation()
  const {item, name} = location.state

  return (
    <div className='selectFilterPage'>
      <div className="flex items-center selectFilterPage-header">
        <Back/>
        <h1 className='filterPage-title'>{name}</h1>
      </div>

      <CheckboxFilter items={item}/>


    </div>
  );
};

export default SelectFilterPage;