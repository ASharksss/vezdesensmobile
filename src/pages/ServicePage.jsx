import React, {useRef, useCallback, useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import search from "../asserts/icons/search.svg";
import filters from "../asserts/messages/setting.svg";
import ServiceItem from "../components/ServiceItem/ServiceItem";
import useCatalogCard from "../redux/hooks/useCatalogCard";
import {fetchCategoryList} from "../redux/slices/CategoryFilterSlice";
import PreloaderComponent from "../components/Preloader/PreloaderComponent";
import FullScreenModal from "../components/Modal/FullScreen/FullScreenModal";
import FilterPage from "./FilterPage";

const ServicePage = () => {

    const {id, sId, obId} = useParams()

    const dispatch = useDispatch()
    const {query, status} = useSelector(state => state.categoryFilter)
    const breadcrumbLoading = status === 'loading'

    useEffect(() => {
        dispatch(fetchCategoryList({id, obId}))
    }, [])

    const [offset, setOffset] = useState(0)
    const [showFilter, setShowFilter] = useState(false)

    const {data, loading, hasMore} = useCatalogCard(0, obId, sId, id, query)

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
        <div className='servicePage'>
            <h1>Работа</h1>
            {!breadcrumbLoading ?
                <Breadcrumbs objectId={parseInt(obId)} subCategoryId={parseInt(sId)} categoryId={parseInt(id)}/> : null}
            <div className="categoryPage-header flex space-between">
                <div className='categoryPage_search flex items-center'>
                    <input type="text" placeholder='Поиск' className='categoryPage_search-input'/>
                    <img src={search} alt=""/>
                </div>
                <button onClick={handleShowFilter} className='relative' type='button'>
                    {query && <span className='notice'></span>}
                    <img src={filters} alt=""/>
                </button>
            </div>

            <div className="servicePage_list">
                {data.length > 0 ? data.map(item => (
                    <React.Fragment ref={lastElementRef}>
                        <ServiceItem item={item}/>
                    </React.Fragment>
                )) : <p>Нет данных</p>}
            </div>
            {showFilter ? <FullScreenModal><FilterPage setShowFilter={setShowFilter} /></FullScreenModal> : null}
        </div>
    );
};

export default ServicePage;