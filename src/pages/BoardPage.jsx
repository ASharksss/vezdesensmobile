import React, {useCallback, useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import './pages.css'
import Long from "../components/Card/Long";
import Premium from "../components/Card/Premium";
import {useLocation} from "react-router";
import useLoadingCard from "../redux/hooks/useLoadingCard";
import BorderComponent from "../components/Board/BoardComponent";
import {getStaticAd, STATIC_HOST} from "../utils";
import axios from "axios";

const BoardPage = () => {
  const location = useLocation();
  const [offset, setOffset] = useState('0|0|0')
  const [allData, setAllData] = useState([])
  const [staticAd, setStaticAd] = useState([])
  const [standardCount, setStandardCount] = useState(0)
  const [standardPlusCount, setStandardPlusCount] = useState(0)
  const [vipCount, setVIPCount] = useState(0)
  const [premium, setPremium] = useState([])

  const {loading, data, hasMore} = useLoadingCard(offset)

  const getPremium = async () => {
    await axios.get('api/board/getPremium')
      .then(res => setPremium(res.data))
  }

  useEffect(() => {
    if (location.pathname === '/') {
      document.title = 'Главная'
      getStaticAd(1, setStaticAd)
      getPremium()
    }
  }, [location.pathname])

  useEffect(() => {
    if (!loading && hasMore) {
      setStandardCount(prevState => prevState + data.filter(item => item.typeAdId === 1).length)
      setStandardPlusCount(prevState => prevState + data.filter(item => item.typeAdId === 2).length)
      setVIPCount(prevState => prevState + data.filter(item => item.typeAdId === 3).length)
    }
    if (!loading && data.length > 0) {
      setAllData(prevState => {
        const combinedData = [...prevState, ...data];
        const uniqueData = _.uniqWith(combinedData, _.isEqual);
        return uniqueData;
      });
    }
  }, [loading, hasMore, data])

  const observer = useRef()
  const lastElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        if (offset !== `${standardCount}|${standardPlusCount}|${vipCount}`) {
          setOffset(`${standardCount}|${standardPlusCount}|${vipCount}`)
        }
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore, offset, standardCount, standardPlusCount, vipCount])

  return (
    <div>
      <div className="board_page">
        <Premium data={premium[Math.floor(Math.random(premium.length))]}/>
        {
          staticAd[0]?.imageName !== undefined ?
            <Long image={`${STATIC_HOST}/promotion/${staticAd[0]?.imageName}`} href={staticAd[1]?.href}/>
            : null
        }
      </div>
      <BorderComponent allData={allData} lastElementRef={lastElementRef}/>

    </div>
  );
};

export default BoardPage;
