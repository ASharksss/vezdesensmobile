import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import filtersSVG from '../asserts/messages/setting.svg'
import search from '../asserts/icons/search.svg'
import Card from "../components/Card/Card";
import Long from "../components/Card/Long";
import './pages.css'
import PreloaderComponent from "../components/Preloader/PreloaderComponent";
import Back from "../ui/Back";
import useCatalogCard from "../redux/hooks/useCatalogCard";
import {fetchCategoryList} from "../redux/slices/CategoryFilterSlice";
import FullScreenModal from "../components/Modal/FullScreen/FullScreenModal";
import FilterPage from "./FilterPage";

const CategoryPage = () => {

  const {id, sId, obId} = useParams()

  const dispatch = useDispatch()
  const {query, status, breadcrumb} = useSelector(state => state.categoryFilter)
  const breadcrumbLoading = status === 'loading'

  useEffect(() => {
    dispatch(fetchCategoryList({id, obId}))
  }, [])

  useEffect(() => {
    if (breadcrumbLoading) return;
    document.title = `Поиск ${breadcrumb?.name}`
  }, [breadcrumbLoading])

  const [offset, setOffset] = useState(0)
  const [showFilter, setShowFilter] = useState(false)

  const {data, loading, hasMore} = useCatalogCard(offset, obId, sId, id, query)

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
  
  const handleShowFilter = (event) => setShowFilter(true)

  if (loading) {
    return <PreloaderComponent/>
  }

  return (
    <div className='categoryPage'>
      <div className="flex items-center ">
        <Back/>
        <h1 className='categoryPage-title'>{data[0]?.object?.name}</h1>
      </div>
      {!breadcrumbLoading ? <Breadcrumbs objectId={parseInt(obId)} subCategoryId={parseInt(sId)} categoryId={parseInt(id)} /> : null}
      <div className="categoryPage-header flex space-between items-center">
        <div className='categoryPage_search flex items-center'>
          <input type="text" placeholder='Поиск' className='categoryPage_search-input'/>
          <img src={search} alt=""/>
        </div>
        <button onClick={handleShowFilter} className='relative' type='button'>
          {query && <span className='notice'></span>}
          <img src={filtersSVG} alt=""/>
        </button>
      </div>

      <div className="categoryPage_list">
        <div className="grid">
          {
            data?.map((item, index) => (
                <React.Fragment key={`card-${index}`} ref={lastElementRef}>
                  <Card classname={'xs'} data={item}/>
                </React.Fragment>
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
      {showFilter ? <FullScreenModal><FilterPage setShowFilter={setShowFilter} /></FullScreenModal> : null}
    </div>
  );
};

export default CategoryPage;