import React, {createRef, useEffect, useState} from 'react';
import styles from './geoposition.module.css';
import {FixedSizeList as List} from 'react-window';
import {useDispatch, useSelector} from "react-redux";

import {fetchGetGeoList, setMainCity} from "../../redux/slices/GeoSlice";

const Row = ({index, isScrolling, style, data}) => (
    <div onClick={() => data.setIdCity(data.searchData[index].id)}
         className={data.idCity === data.searchData[index].id ? styles.activeRow : styles.row}
         style={style}>{isScrolling ? 'Scrolling' : `${data.searchData[index].name}`}</div>
);

const Geoposition = ({setShow, handleAddress=undefined}) => {
    const dispatch = useDispatch()
    const {data, mainPath, mainCity, mainSlugCity} = useSelector(state => state.geo)
    const {id, positionRegionId, positionDistrictId} = mainPath
    const {items, status} = data

    const isLoading = status === 'loading'
    const listRef = createRef();
    const screenHeight = window.screen.height - 80;

    const [search, setSearch] = useState('');
    const [indexById, setIndexById] = useState(0)

    const [idCity, setIdCity] = useState(id)
    const [nameCity, setNameCity] = useState(mainCity)
    const [slugCity, setSlugCity] = useState(mainSlugCity)
    const [idRegion, setIdRegion] = useState(positionRegionId)
    const [nameRegion, setNameRegion] = useState('')
    const [nameDistrict, setNameDistrict] = useState('')
    const [idDistrict, setIdDistrict] = useState(positionDistrictId)

    let searchData = items.cities !== undefined ? items.cities.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) : []

    useEffect(() => {
        dispatch(fetchGetGeoList())
    }, [])

    const handleSave = (event) => {
        if (nameCity.trim() === '') return;
        const data = {
            name: nameCity,
            slug: slugCity,
            path: {id: idCity, positionRegionId: idRegion, positionDistrictId: idDistrict}
        }
        dispatch(setMainCity(data))
        setShow(false)
        window.location.reload()
    }

    useEffect(() => {
        if (isLoading) return;
        if (listRef.current === null) return;
        setIndexById(items.cities.findIndex(item => item.id === id))
        listRef.current.scrollToItem(indexById, "start");
    }, [isLoading])

    useEffect(() => {
        if ((idRegion === 1 && idDistrict === 1 && idCity) || items.length === 0) return;
        const city = items.cities.find(item => item.id === idCity)
        const region = items.regions.find(item => item.id === city.positionRegionId)
        const district = items.districts.find(item => item.id === region.positionDistrictId)
        setNameDistrict(district.name)
        setIdDistrict(district.id)
        setNameRegion(region.name)
        setIdRegion(region.id)
        setNameCity(city.name)
    }, [handleAddress, idCity])

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
                        itemData={{searchData, setIdCity, idCity}}
                        width={300}
                    >
                        {Row}
                    </List>
                    : null}
            </div>
            <div className={styles.buttonWrapper}>
                <button type='button' className={styles.saveButton} onClick={handleAddress === undefined ? handleSave : () => handleAddress(nameCity, nameRegion, nameDistrict)}>Сохранить</button>
            </div>
        </div>
    );
};

export default Geoposition;