import React, {useCallback, useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import BoardComponent from "../components/Board/BoardComponent";
import Long from "../components/Card/Long";
import useLoadingCard from "../redux/hooks/useLoadingCard";
import {useSearchParams} from "react-router-dom";
import {getStaticAd, STATIC_HOST} from "../utils";

const SimilarPage = () => {
  let [searchParams, ] = useSearchParams();
  const objectId = parseInt(searchParams.get('object')) || null

  const [offset, setOffset] = useState(0)
  const [allData, setAllData] = useState([])
  const [standardCount, setStandardCount] = useState(0)
  const [standardPlusCount, setStandardPlusCount] = useState(0)
  const [vipCount, setVIPCount] = useState(0)
  const [staticAd, setStaticAd] = useState([])

  const {loading, data, hasMore} = useLoadingCard(offset, objectId)

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

  useEffect(() => {
    getStaticAd(1, setStaticAd)
  }, [])

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
    <div className='wrapper'>
      {
        staticAd[0]?.imageName !== undefined ?
          <Long image={`${STATIC_HOST}/promotion/${staticAd[0]?.imageName}`} href={staticAd[1]?.href}/>
          : null
      }
      <h1 className='similar_title'>Похожие объявления</h1>
      <BoardComponent allData={allData} lastElementRef={lastElementRef}/>

    </div>
  );
};

export default SimilarPage;