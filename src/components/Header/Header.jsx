import React, {useEffect, useRef, useState} from 'react';
import './header.css'
import logo from '../../asserts/logo.svg'
import location_icon from '../../asserts/cardPage/location.svg'
import burger_icon from '../../asserts/icons/menu_burger.svg'
import search_icon from '../../asserts/icons/search.svg'
import CategoryItem from "../CategoryItem/CategoryItem";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import {useTabletDetection} from "../../redux/hooks/useTabletDetection";
import FullScreenModal from "../Modal/FullScreen/FullScreenModal";
import Geoposition from "../Geoposition/Geoposition";

const Header = () => {
  const wrapperRef = useRef(null)

  const [openCategory, setOpenCategory] = useState(false)
  const [showGeolocation, setShowGeolocation] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const isTablet = useTabletDetection(); //првоерка размера

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpenCategory(false)
      setShowGeolocation(false)
    }
  }

  const handleShowPosition = () => setShowGeolocation(prevState => !prevState)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


  const getData = async () => {
    await axios.get(`api/categories/getCategoriesList`)
      .then(res => {
        setData(res.data)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    getData()
  }, [])


  return (
    <div className={'header header_shadow'} ref={wrapperRef}>
      {
          isTablet ? (
            <div className="wrapper-tablet">
        <div className='item'>
        <div className='header_logo'>
        <NavLink to='/'>
          <img src={logo} className='header_logo-img'/>
        </NavLink>
        </div>
        </div>
        <div className='item'>
        <div className="header_location">
          <div className=" header_location-wrapper flex" onClick={handleShowPosition}>
            <img className='header_location-icon' src={location_icon} alt='Город'/><span>Казань</span>
          </div>
        </div>
        <div className="flex header_search">
          {
            openCategory ?
              <button className='header_search_btn_white' onClick={() => {
                setOpenCategory(!openCategory)

              }}>
                <img src={burger_icon} alt='меню'/>
              </button>
              :
              <button className='header_search_btn' onClick={() => setOpenCategory(!openCategory)}>
                <img src={burger_icon} alt='меню'/>
              </button>
          }

          <div className="flex header_search_wrapper">
            <img className='header_search-icon' src={search_icon} alt=""/>
            <input className='header_search_input' placeholder='Искать объявления' type="text"/>
          </div>


        </div>
        </div>
            </div>
          ) : (
          <div className="wrapper">
            
            <div className="header_location">
              <div className=" header_location-wrapper flex" onClick={handleShowPosition}>
                <img className='header_location-icon' src={location_icon} alt='Город'/><span>Казань</span>
              </div>
            </div>
            <div className="flex header_search">
              {
                openCategory ?
                  <button className='header_search_btn_white' onClick={() => {
                    setOpenCategory(!openCategory)

                  }}>
                    <img src={burger_icon} alt='меню'/>
                  </button>
                  :
                  <button className='header_search_btn' onClick={() => setOpenCategory(!openCategory)}>
                    <img src={burger_icon} alt='меню'/>
                  </button>
              }

              <div className="flex header_search_wrapper">
                <img className='header_search-icon' src={search_icon} alt=""/>
                <input className='header_search_input' placeholder='Искать объявления' type="text"/>
              </div>


            </div>
          
          </div>
          ) 
        }
      
      
      {
        openCategory ?
          <div className='category_list'>
            {
              data.map((item) => (
                <CategoryItem address={'subCategory'} item={item}/>
              ))
            }
          </div> : null
      }
      {
        showGeolocation ? <FullScreenModal><Geoposition setShow={setShowGeolocation}/></FullScreenModal> : null
      }
    </div>
  );
};

export default Header;