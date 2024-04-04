import React, {useEffect, useState} from 'react';
import FavoriteItem from "../components/FavoriteItem/FavoriteItem";
import settings from '../asserts/messages/setting.svg'
import axios from "axios";
import {useSelector} from "react-redux";
import MoreSubMenu from "../ui/moreSubMenu";

const FavoritePage = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [openFilter, setOpenFilter] = useState(false)
  const [filterChoice, setFilterChoice] = useState('old')
  const {isAuth} = useSelector(state => state.user)

  const items = [
    {
      title: 'Сначала новые',
      onClick: () => setFilterChoice('new')
    },
    {
      title: 'Сначала старые',
      onClick: () => setFilterChoice('old')
    },
  ]

  const getData = () => {
    axios.get(`api/user/getFavorite`)
      .then(res => setData(res.data))
  }

  useEffect(() => {
    if (!isAuth) return;
    getData()
  }, [isAuth])

  useEffect(() => {
    if (data.length === 0) return;
    let filtered
    if (filterChoice === 'old') {
      filtered = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } else if (filterChoice === 'new') {
      filtered = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    setData(filtered)
  }, [filterChoice])

  console.log(data)
  return (
    <div className='favoritePage'>
      <div className="flex space-between ">
        <h1>Избранное</h1>
        <img src={settings} alt="" onClick={() => setOpenFilter(!openFilter)}/>
        {
          openFilter ? <span className='favoritePage_subMenu'><MoreSubMenu setOpen={setOpenFilter} items={items}/></span> : null
        }
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