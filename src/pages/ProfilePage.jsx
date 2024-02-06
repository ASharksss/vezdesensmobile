import React, {useEffect, useState} from 'react';
import avatar from '../asserts/profile/empty_avatar6969.svg'
import dots from '../asserts/profile/dots.svg'
import search_icon from '../asserts/icons/search.svg'
import filter_icon from '../asserts/icons/filter.svg'
import MyCard from "../components/MyCard/MyCard";
import StarComponent from "../components/ReviewComponents/StarComponents";
import {useParams} from "react-router-dom";
import axios from "axios";
import {AVATAR_HOST} from "../utils";


const ProfilePage = () => {

  const {id} = useParams()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [average, setAverage] = useState(0)

  const getData = async () => {
    await axios.get(`/api/user/getOneUser/${id}`)
      .then(res => {
        setData(res.data)
        document.title = `Профиль ${res.data.name}`
        setLoading(false)
      })
  }

  useEffect(() => {
    setLoading(true)
    getData(data)
  }, [])


  useEffect(() => {
    // Вычисление средней оценки рейтинга
    const dataRatings = data?.ratings || []
    if (dataRatings.length > 0) {
      let ratings = dataRatings.map(item => item.grade)
      const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setAverage(sum !== 0 ? (sum / ratings.length).toFixed(2) : 0)
    }
  }, [data, loading])


  if (loading) {
    return <div>
      loading...
    </div>
  }
  return (
    <div className='container'>
      <div className='profile'>
        <div>
          <div className="profile_info flex space-between">
            <div className='flex items-center'>
              <div className="profile_info-avatar">
                <img src={`${AVATAR_HOST}/${data.userAvatars[0]?.name}`} width={64} alt=""
                     className='profile_info-img'/>
              </div>
              <div className="profile_info-text">
                <h1 className='profile_info-name'>{data.name}</h1>
                <p className='profile_info-phone'>{data.phone}</p>
              </div>
            </div>
            <div className="profile_info-icon">
              <span><img src={dots} alt=""/></span>
            </div>
          </div>
          <div className="profile_reviews flex items-center">
            <span>{average}</span>
            <StarComponent average={average} width={19}/>
          </div>
          <div className="profile_cards">
            <h1 className='profile_cards-title'>Мои объявления</h1>
            <div className="nav">
              <label htmlFor={"active"} className='profile_card-active'>Активные</label>
              <label htmlFor={"archive"} className='profile_card-archive'>Архив</label>
            </div>
              <input type="radio" id="active" name='item' checked/>
              <input type="radio" id="archive" name='item'/>

            <div className="slider"></div>
            <div className='flex space-between items-center'>
              <div className='profile_search flex space-between'>
                <input type="text" placeholder='Поиск'/>
                <img src={search_icon} alt=""/>
              </div>
              <div>
                <img src={filter_icon} alt=""/>
              </div>
            </div>
            {
              !loading && data.ads.map((item, index) => item.statusAdId === 2 && (
                <MyCard item={item} key={`card-${index}`}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>

  );


};

export default ProfilePage;
