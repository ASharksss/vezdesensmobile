import React, {useEffect, useState} from 'react';
import favorite from "../asserts/board/favorite.svg";
import redFavorite from "../asserts/icons/redFavorite.svg";
import './style.css'
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

const FavoriteBtn = ({id, isFavorite}) => {

  const [red, setRed] = useState(false)
  const {isAuth} = useSelector(state => state.user)
  const navigate = useNavigate()
  const handleClick = async () => {
    if (!isAuth) return navigate('/auth')
    if (red) {
      await axios.delete(`api/ad/removeFavorite?adId=${id}`)
        .then((res) => {
          setRed(false)
        })
    } else {
      await axios.get(`api/ad/inFavorite?adId=${id}`)
        .then((res) => {
          setRed(true)
        })
    }
  }

  useEffect(() => {
    if (isFavorite !== undefined) {
      if (isFavorite.length > 0) {
        setRed(true)
      }
      if (isFavorite === true) {
        setRed(true)
      }
    }
  }, [id])

  return (
    <div className='card_favorite_icon' onClick={() => handleClick()}>
      {
        red ? <img src={redFavorite} alt=""/> : <img src={favorite} alt=""/>
      }
    </div>
  );
};

export default FavoriteBtn;