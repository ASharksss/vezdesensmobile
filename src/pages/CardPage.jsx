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
import {pluralRusVariant, relativeDate, getStaticAd, STATIC_HOST, useTabletDetection} from "../utils";
import CarouselComponent from "../components/Carousel/CarouselComponent";
import PreloaderComponent from "../components/Preloader/PreloaderComponent";
import SimilarBtn from "../ui/SimilarBtn";
import FavoriteBtn from "../ui/favoriteBtn";
import {useSelector} from "react-redux";
import Fancybox from "../components/fancybox";
import Long from '../components/Card/Long'
import {shareOnMobile} from "react-mobile-share";

const CardPage = () => {
  const {isAuth} = useSelector(state => state.user)

  const navigate = useNavigate()
  const {id} = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})
  const [average, setAverage] = useState(0)
  const [staticAd, setStaticAd] = useState([])

  const isTablet = useTabletDetection(); //првоерка размера
  // Для банера 
  useEffect(() => {
    getStaticAd(1, setStaticAd)
  }, [])

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

  const handleShowSimilar = () => navigate({
    pathname: '/similarPage',
    search: `?object=${data?.object.id}`,
  })

  const isGroup = function () {
    return data.adCharacteristicSelects.length === 0 && data.adCharacteristicInputs.length === 0 ?
      false : true
  }

  const groupedCharacteristics = {};
  if (data && data.adCharacteristicSelects) {
    data.adCharacteristicSelects.forEach((item) => {
      const {name} = item.characteristic;
      if (!groupedCharacteristics.hasOwnProperty(name)) {
        groupedCharacteristics[name] = [];
      }
      groupedCharacteristics[name].push(item.characteristicValue.name);

    });
  }

  if (isLoading) {
    return <PreloaderComponent/>
  } else {
    return (
      <div className='card_page'>
        <div className='wrapper'>

          {
            isTablet && staticAd[0]?.imageName !== undefined ?
              <Long image={`${STATIC_HOST}/promotion/${staticAd[0]?.imageName}`} href={staticAd[1]?.href}/>
              : null
          }
          <div className="card_header">
            <div className="flex space-between">
              <img src={back_icon} alt="" onClick={() => navigate(-1 || '/')}/>
              <div className="flex">
                <div className='card_icon'>
                  <FavoriteBtn id={data.id} isFavorite={data.favorites} userData={data?.user}/>
                </div>

                <button className='card_icon' onClick={() =>
                  shareOnMobile(
                    {
                      //text: "Hey checkout our package react-mobile-share",
                      url: window.location.href,
                      title: document.title,
                      //images: [imgBase64]
                    }
                  )
                }
                ><img src={share_icon} alt=""/>
                </button>
              </div>
            </div>
          </div>

          <Breadcrumbs data={data.object}/>
          <div className="card_images">
            <Fancybox
              options={{
                Carousel: {
                  infinite: true,
                },
              }}>
              <CarouselComponent dataImages={data.imageAds}/>
            </Fancybox>

            <SimilarBtn handleClick={handleShowSimilar}/>
          </div>
          <h1 className='card_title'>{data.title}</h1>
          <h2 className='card_price'>{data.price} <span style={{fontFamily: 'Arial'}}>₽</span></h2>

          <div className="card_seller_info">
            <NavLink to={`/profilePage/${data.user.id}`} className='noLink'>
              <h1 className='card_seller-title'>{data.user?.name}</h1>
            </NavLink>
            <div className="flex card_reviews">
						<span className='card_reviews-stars flex'>
						  <span className='cardPage_average'>{average}</span>
						  <StarComponent average={average} width={23}/>
						</span>
              {isAuth ?
                <NavLink to='/review' className='noLink' state={{userId: data.user.id}}>
                  <span className='card_page-count'>{data.user?.ratings.length} отзыв</span>
                </NavLink> : null}
            </div>
          </div>
          <span className='card_seller-address'>
						  {data.address}
					</span>

          <div className="card_btns">
            <button className='black_btn'><img src={phone_icon} alt=""/></button>
            <NavLink to='/dialog'>
              <button className='white_btn'><img src={message_icon} alt=""/></button>
            </NavLink>

          </div>

          <div className="card_description">
            <h1 className="card_description-title">Описание</h1>
            <pre className='card_description-text'>
							{data.description}
						</pre>
          </div>
          {isGroup() ? (
            <div className="card_сharacteristics">
              <h1 className="card_сharacteristics-title">Характеристики</h1>
              <div className='card_сharacteristics-child'>
                {
                  data.adCharacteristicInputs.map((item, index) => (
                    <ul className='сharacteristics_child-flex'>
                      <li className='_child-flex-title'>
                        <b key={index}>{item.characteristic.name}:&nbsp;</b>
                        <span key={index}>{item.value}</span>
                      </li>
                    </ul>
                  ))
                }
              </div>
              <div className='card_сharacteristics-child'>
                {Object.entries(groupedCharacteristics).map(([characteristic, values]) => (
                  <ul className='сharacteristics_child-flex' key={characteristic}>
                    <li className='_child-flex-title'>
                      <b>{characteristic}:&nbsp;</b>
                      {values.map((value, index) => (
                        <span key={index}>{value}{values.length > 1 ? "; " : ""}</span>
                      ))}
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          ) : (
            <>
            </>
          )}
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
