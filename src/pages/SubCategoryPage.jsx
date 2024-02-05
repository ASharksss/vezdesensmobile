import React, {useEffect, useMemo, useState} from 'react';
import Back from "../ui/Back";
import CategoryItem from "../components/CategoryItem/CategoryItem";
import arrow from "../asserts/car_arrow.svg";
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
import {relativeDate} from "../utils";
import PreloaderComponent from "../components/Preloader/PreloaderComponent";

const SubCategoryPage = () => {

  const {id, obId} = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const getData = async () => {
    await axios.get(`api/categories/getCategoriesList?categoryId=${id}&object=NaN`)
      .then(res => {
        setData(res.data)
        setIsLoading(false)
      })
  }
  const getDataObject = async () => {
    await axios.get(`api/categories/getCategoriesList?categoryId=${id}&object=NaN`)
      .then(res => {
        setData(res.data[0].subCategories.filter(item => item.id === parseInt(obId)))
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    setData([])
    if (obId === undefined)
      getData()
    else
      getDataObject()
  }, [id, obId])

  const constructList = useMemo(() => {
    const combined = []
    if(obId === undefined && !isLoading){
      data[0]?.subCategories !== undefined && data[0]?.subCategories.map((item, index) => {
        combined.push(<CategoryItem key={`subCategory-${index}`} address={`subCategory/${id}`} item={item}/>)
      })
    } else {
      data[0]?.objects !== undefined && data[0].objects.map((item, index) => {
        combined.push(<CategoryItem key={`categoryPage-${index}`} address={`categoryPage`} item={item}/>)
      })
    }
    return combined
  }, [obId, isLoading, data])

  if (isLoading) {
    return <PreloaderComponent/>
  }

  return (
    <div className='subCategory'>
      <div className="subCategory_header flex items-center">
        <Back/>
        <h1 className='subCategory_header-title'>{data[0].name.indexOf('/') > 1 ? data[0].name.split('/')[0] : data[0].name}</h1>

      </div>
      <div className="category_list">
        {constructList}
        <NavLink to={'/servicePage'} className='noLink'>
          <div className="category_item flex items-center space-between">
            <span className='category_item-title'>Работа</span>
            <img src={arrow} alt="" className='category_item-icon'/>
          </div>
        </NavLink>
      </div>

    </div>
  );
};

export default SubCategoryPage;