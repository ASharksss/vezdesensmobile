import {useEffect, useState} from "react";
import _ from 'lodash';
import axios from "axios";
import {useSelector} from "react-redux";
import {useTabletDetection} from "./useTabletDetection";

export default function useLoadingCard(offset, objectId=null) {
  const {geoStatus} = useSelector(state => state.geo)
  const isGeoDone = geoStatus === 'done'

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(false)

  const isTablet = useTabletDetection();

  useEffect(() => {
    if (!isGeoDone) return;
    setData([])
  }, [offset, isGeoDone])

  useEffect(() => {
    setLoading(true)
    setHasMore(false)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: '/api/board/getAllMobile',
      params: {offset, objectId, isTablet},
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setData(prevState => {
        const combinedData = [...prevState, ...res.data.ads];
        const uniqueData = _.uniqWith(combinedData, _.isEqual);
        return uniqueData;
      });
      setHasMore(res.data.ads.length > 4)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [offset, isGeoDone])
  return {loading, error, data, hasMore}
}