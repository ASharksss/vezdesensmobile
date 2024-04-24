import React, {createRef, useEffect, useState} from 'react';
import styles from './geoposition.module.css';
import {FixedSizeList as List} from 'react-window';
import {useDispatch, useSelector} from "react-redux";

import {fetchGetGeoList} from "../../redux/slices/GeoSlice";

const Row = ({index, isScrolling, style, data}) => (
    <div style={style}>{isScrolling ? 'Scrolling' : `${data[index].name}`}</div>
);

const Geoposition = ({setShow}) => {
    const dispatch = useDispatch()
    const {data, mainPath} = useSelector(state => state.geo)
    const {id} = mainPath
    const {items, status} = data

    const isLoading = status === 'loading'
    const listRef = createRef();
    const screenHeight = window.screen.height - 80;

    const [search, setSearch] = useState('');
    const [indexById, setIndexById] = useState(0)
    let searchData = items.cities !== undefined ? items.cities.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) : []

    useEffect(() => {
        dispatch(fetchGetGeoList())
    }, [])
    useEffect(() => {
        if (isLoading) return;
        if (listRef.current === null) return;
        setIndexById(items.cities.findIndex(item => item.id === id))
        listRef.current.scrollToItem(indexById, "start");
    }, [isLoading])
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>Выберите город</span>
                <span onClick={() => setShow(false)} className={styles.closeBtn}>x</span>
            </div>
            <div className={styles.searchContainer}>
                <input type="text" className={styles.search} placeholder='Найти город'
                    onChange={event => setSearch(event.target.value)}/>
                <button className={styles.searchBtn}>Поиск</button>
            </div>
            <div className={styles.list}>
                {!isLoading ?
                    <List
                        useIsScrolling
                        ref={listRef}
                        height={screenHeight}
                        itemCount={searchData.length}
                        itemSize={35}
                        itemData={searchData}
                        width={300}
                    >
                        {Row}
                    </List>
                    : null}
            </div>
        </div>
    );
};

export default Geoposition;