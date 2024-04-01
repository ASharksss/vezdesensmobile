import React, {useEffect, useState} from 'react';
import FavoriteItem from "../components/FavoriteItem/FavoriteItem";
import settings from '../asserts/messages/setting.svg'
import axios from "axios";
import {useSelector} from "react-redux";

const FavoritePage = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const {isAuth} = useSelector(state => state.user)

  const getData = () => {
    axios.get(`api/user/getFavorite`)
      .then(res => setData(res.data))
  }

  useEffect(() => {
    if (!isAuth) return;
    getData()
  }, [isAuth])


  console.log(data)
  return (
    <div className='favoritePage'>
      <div className="flex space-between ">
        <h1>Избранное</h1>
        <img src={settings} alt=""/>
      </div>

      <div className="favorite_list">
        {
          data.map((item) => (
              <FavoriteItem data={item}/>
            )
          )
        }
      </div>
    </div>
  );
};

export default FavoritePage;