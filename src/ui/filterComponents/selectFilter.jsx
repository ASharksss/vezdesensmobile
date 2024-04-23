import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import './style.css'
import ModalTemplate from "../../components/Modal/ModalTemplate";

const SelectFilter = ({data, name, setValue, value, type}) => {

  const [open, setOpen] = useState(false)


  return (
    <div className='filter_item'>
      <label className='enterFilter-title'>{name}</label>
      <div className='selectInput' onClick={() => setOpen(true)}>
        {value ? value : 'Выберите значение...'}
      </div>

    </div>
  );
};

export default SelectFilter;