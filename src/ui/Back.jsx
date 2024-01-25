import React from 'react';
import arrow from '../asserts/cardPage/back_arrow.svg'
import {useNavigate} from "react-router";


const Back = () => {

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(-1)}>
      <img src={arrow} alt=""/>
    </div>
  );
};

export default Back;