import React, {useRef, useCallback, useState} from 'react';
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import search from "../asserts/icons/search.svg";
import filters from "../asserts/messages/setting.svg";
import ServiceItem from "../components/ServiceItem/ServiceItem";
import {NavLink, useParams} from "react-router-dom";
import useCatalogCard from "../redux/hooks/useCatalogCard";

const ServicePage = () => {

  const {id, sId, obId} = useParams()

  const [offset, setOffset] = useState(0)

  const {data, loading, hasMore} = useCatalogCard(0, obId, sId, id, null)

  const observerDiv = useRef()
  const lastElementRef = useCallback(node => {
    if (loading) return
    if (observerDiv.current) observerDiv.current.disconnect()
    observerDiv.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        if (offset !== data.length) {
          setOffset(offset + data.length)
        }
      }
    })
    if (node) observerDiv.current.observe(node)
  }, [loading, hasMore, offset])
  return (
    <div className='servicePage'>
      <h1>Работа</h1>
      <Breadcrumbs data={data[0]?.object}/>
      <div className="categoryPage-header flex space-between">
        <div className='categoryPage_search flex items-center'>
          <input type="text" placeholder='Поиск' className='categoryPage_search-input'/>
          <img src={search} alt=""/>
        </div>
        <img src={filters} alt=""/>
      </div>

      <div className="servicePage_list">
        {data.length > 0 ? data.map(item => (
          <React.Fragment ref={lastElementRef}>
            <ServiceItem item={item}/>
          </React.Fragment>
        )) : <p>Нет данных</p>}
      </div>
    </div>
  );
};

export default ServicePage;