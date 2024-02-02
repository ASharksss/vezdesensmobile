import React, {useEffect, useState} from 'react';
import './pages.css'
import back_icon from '../asserts/cardPage/back_arrow.svg'
import share_icon from '../asserts/cardPage/share.svg'
import favorite_icon from '../asserts/cardPage/favorite.svg'
import phone_icon from '../asserts/cardPage/phone_white.svg'
import message_icon from '../asserts/cardPage/message_black.svg'

import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Backbtn from "../ui/Backbtn";
import {NavLink, useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import StarComponent from "../components/ReviewComponents/StarComponents";
import axios from "axios";
import {pluralRusVariant, relativeDate} from "../utils";
import CarouselComponent from "../components/Carousel/CarouselComponent";
import PreloaderComponent from "../components/Preloader/PreloaderComponent";
import SimilarBtn from "../ui/SimilarBtn";

const CardPage = () => {
  const navigate = useNavigate()
  const {id} = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})
  const [average, setAverage] = useState(0)

  const getData = async () => {
    await axios.get(`api/ad/getOneAd/${id}`)
      .then(res => {
        document.title = 'Карточка № ' + res.data.ad.id + ' · ' + res.data.ad.title + ' · ' + relativeDate(new Date(res.data.ad.createdAt))
        setData(res.data?.ad)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    getData()
  }, [])

  useEffect(() => {
    // Вычисление средней оценки рейтинга
    const dataRatings = data?.user?.ratings || []
    if (dataRatings.length > 0) {
      let ratings = dataRatings.map(item => item.grade)
      const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setAverage(sum !== 0 ? (sum / ratings.length).toFixed(2) : 0)
    }
  }, [data, isLoading])

  if (isLoading) {
    return <PreloaderComponent/>
  } else {
    return (
      <div className='card_page'>
        <div className='wrapper'>
          <div className="card_header">
            <div className="flex space-between">
              <img src={back_icon} alt="" onClick={() => navigate(-1 || '/')}/>
              <div className="flex">
                <img className='card_icon' src={share_icon} alt=""/>
                <img className='card_icon' src={favorite_icon} alt=""/>
              </div>
            </div>
          </div>
          <div className="breadcrumbs">
            <Breadcrumbs data={data.object}/>
          </div>
          <div className="card_images">
            <CarouselComponent dataImages={data.imageAds}/>
            <SimilarBtn/>
          </div>
          <h1 className='card_title'>{data.title}</h1>
          <h2 className='card_price'>{data.price}</h2>

          <div className="card_seller_info">
            <NavLink to={`/profilePage/${data.user.id}`} className='noLink'>
              <h1 className='card_seller-title'>{data.user?.name}</h1>
            </NavLink>
            <div className="flex card_reviews">
						<span className='card_reviews-stars flex'>
						  <span className='cardPage_average'>{average}</span>
						  <StarComponent average={average} width={23}/>
						</span>
              <NavLink to='/review' className='noLink' state={{userId: data.user.id}}>
                <span className='card_page-count'>{data.user?.ratings.length} отзыв</span>
              </NavLink>
            </div>
          </div>
          <span className='card_seller-address'>
						  {data.address}
					</span>

          <div className="card_btns">
            <button className='black_btn'><img src={phone_icon} alt=""/></button>
            <button className='white_btn'><img src={message_icon} alt=""/></button>
          </div>

          <div className="card_description">
            <h1 className="card_description-title">Описание</h1>
            <pre className='card_description-text'>
							{data.description}
						</pre>
          </div>
          <div className="card_backbtn">
            <Backbtn/>
          </div>

          <div className="card_statistic">
            <p className='card_statistic-text'>
              <span>№ {data.id}</span> · <span>{relativeDate(new Date(data.createdAt))}</span></p>
            <p
              className='card_statistic-text'>{data.views} {`${["просмотр", "просмотра", "просмотров"][pluralRusVariant(parseInt(data.views))]}`} ({data.viewsToday} сегодня)</p>
          </div>

        </div>
      </div>

    );
  }
};

export default CardPage;
