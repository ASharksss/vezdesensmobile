import React from 'react';
import CheckboxFilter from "../ui/filterComponents/CheckboxFilter";
import Back from "../ui/Back";
import {useLocation} from "react-router";
import CloseBtn from "../ui/closeBtn";

const SelectFilterPage = ({data, setValue, setOpen}) => {

  return (
    <div className='selectFilterPage'>
      <div className="flex items-center selectFilterPage-header">
        {/*  <Back/>*/}
        {/*   <h1 className='filterPage-title'> Название </h1>*/}
      </div>
      {
        data.map((item) => (
          <CheckboxFilter item={item} setValue={setValue} setOpen={setOpen}/>
        ))
      }


    </div>
  );
};

export default SelectFilterPage;