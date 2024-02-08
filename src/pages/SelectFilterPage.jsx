import React from 'react';
import CheckboxFilter from "../ui/filterComponents/CheckboxFilter";
import Back from "../ui/Back";
import {useLocation} from "react-router";
import CloseBtn from "../ui/closeBtn";

const SelectFilterPage = ({data, setValue, setOpen, type}) => {

  return (
    <div className='selectFilterPage'>
      <div className="flex items-center selectFilterPage-header">
  {/*      <Back/>
        <h1 className='filterPage-title'>Название</h1>*/}
      </div>
          <CheckboxFilter type={type} item={data} setValue={setValue} setOpen={setOpen}/>
      <button onClick={() => setOpen(false)}>Применить</button>

    </div>
  );
};

export default SelectFilterPage;