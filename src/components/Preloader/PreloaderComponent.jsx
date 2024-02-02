import React from 'react';
import './preloader.css'
import logoSVG from '../../asserts/logo.svg';

const PreloaderComponent = () => {
    return (
        <div className='container_preloader'>
            <div className="loader">
                <div className='circle-preloader circle-front'></div>
                <div className='circle-preloader circle-rear'></div>
                <img src={logoSVG} alt="Логотип" width={128}/>
            </div>
            <div className='loader-text'>
                <span>Загрузка страницы</span>
            </div>
        </div>
    );
};

export default PreloaderComponent;
