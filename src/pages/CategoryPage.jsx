import React, {useCallback, useEffect, useRef, useState} from 'react';
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import filters from '../asserts/messages/setting.svg'
import search from '../asserts/icons/search.svg'
import Card from "../components/Card/Card";
import Long from "../components/Card/Long";
import './pages.css'
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
import PreloaderComponent from "../components/Preloader/PreloaderComponent";
import Back from "../ui/Back";

const CategoryPage = () => {

  const {id} = useParams()

  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const observer = useRef()
  const lastElementRef = useCallback(node => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (offset !== data.length) {
          setOffset(offset + data.length)
        }
      }
    })
    if (node) observer.current.observe(node)
  }, [offset])

  const getData = async () => {
    await axios.get(`api/board/getAll?objectId=${id}&offset=${offset}`)
      .then(res => {
        setData(res.data.ads)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    getData()
  }, [])

  if (isLoading) {
    return <PreloaderComponent/>
  }

  return (
    <div className='categoryPage'>
      <div className="flex items-center ">
        <Back/>
        <h1 className='categoryPage-title'>{data[0]?.object?.name}</h1>
      </div>
      <Breadcrumbs data={data[0]?.object}/>
      <div className="categoryPage-header flex space-between items-center">
        <div className='categoryPage_search flex items-center'>
          <input type="text" placeholder='Поиск' className='categoryPage_search-input'/>
          <img src={search} alt=""/>
        </div>
        <NavLink to='/filterPage'>
          <img src={filters} alt=""/>
        </NavLink>
      </div>

      <div className="categoryPage_list">
        <div className="grid">
          {
            data?.map((item) => (
              <Card classname={'xs'} data={item}/>
            ))
          }
        </div>
    {/*    <div className="grid">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        <Card classname={'l'}/>*/}
      </div>

    </div>
  );
};

export default CategoryPage;