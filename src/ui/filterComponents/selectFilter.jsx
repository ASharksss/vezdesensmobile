import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import './style.css'
import SelectFilterPage from "../../pages/SelectFilterPage";
import ModalTemplate from "../../components/Modal/ModalTemplate";

const SelectFilter = ({data, setValue, value, type}) => {

  const [open, setOpen] = useState(false)


  return (
    <div className='filter_item'>
      <label className='enterFilter-title'>Название</label>
      <div className='selectInput' onClick={() => setOpen(true)}>
        {value ? value : 'Выберите значение...'}
      </div>
      {
        open ?
          <ModalTemplate activeModal={open} setActiveModal={setOpen}
                         children={<SelectFilterPage data={data} type={type} setValue={setValue} setOpen={setOpen}/> }/>
          : null
      }
    </div>
  );
};

export default SelectFilter;