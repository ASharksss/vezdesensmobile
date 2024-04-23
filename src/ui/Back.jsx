import React from 'react';
import arrow from '../asserts/cardPage/back_arrow.svg'
import {useNavigate} from "react-router";


const Back = ({handleClick = null}) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => handleClick ? handleClick() : navigate(-1)}>
            <img src={arrow} alt=""/>
        </div>
    );
};

export default Back;