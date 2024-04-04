import React, {useEffect, useState} from 'react';
import avatar from '../asserts/profile/empty_avatar6969.svg'
import dots from '../asserts/profile/dots.svg'
import search_icon from '../asserts/icons/search.svg'
import filter_icon from '../asserts/icons/filter.svg'
import MyCard from "../components/MyCard/MyCard";
import StarComponent from "../components/ReviewComponents/StarComponents";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {AVATAR_HOST, getCookie, useTabletDetection} from "../utils";
import MoreSubMenu from "../ui/moreSubMenu";
import {useSelector} from 'react-redux';
import PreloaderComponent from '../components/Preloader/PreloaderComponent';
import EditProfilePage from './EditProfilePage';


const ProfilePage = () => {
  const {id} = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [average, setAverage] = useState(0)
  const [choice, setChoice] = useState('active')
  const [openSubMenu, setOpenSubMenu] = useState(false)
  const [openFilter, setFilter] = useState(false)
  const [openEditUser, setEditUser] = useState(false);
  const [filterChoice, setFilterChoice] = useState('old')
  const navigate = useNavigate();

  const {user} = useSelector(state => state.user)

  let items = [
    {
      title: 'Помощь',
      onClick: () => navigate(`/support`)
    },
    {
      title: 'Выйти',
      onClick: () => handleExit()
    }
  ]
  let phoneItems = [
    {
      title: 'Редактировать',
      onClick: () => navigate(`/editProfile/${id}`)
    },
    ...items,
  ]
  let tabletImtes = [
    {
      title: 'Редактировать',
      onClick: () => setEditUser(!openEditUser)
    },
    ...items,
  ]
  let filterItems = [
    {
      title: 'Снача новые',
      onClick: () => setFilterChoice('new')
    },
    {
      title: 'Снача старые',
      onClick: () => setFilterChoice('old')
    }
  ]

  const isTablet = useTabletDetection(); //првоерка размера

  const handleExit = () => {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      navigate('/')
    }
    window.location.reload()
  }

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
  }, [id])

  useEffect(() => {
    if (data?.ads === undefined) return;
    let filtered
    if (filterChoice === 'old') {
      filtered = data.ads.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } else if (filterChoice === 'new') {
      filtered = data.ads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    setData(prevState => ({...prevState, ads: filtered}))
  }, [filterChoice])

  // Вычисление средней оценки рейтинга
  useEffect(() => {
    const dataRatings = data?.ratings || []
    if (dataRatings.length > 0) {
      let ratings = dataRatings.map(item => item.grade)
      const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setAverage(sum !== 0 ? (sum / ratings.length).toFixed(2) : 0)
    }
  }, [data, loading])


  // console.log(data)
  // console.log(getCookie(profile.data))

  const isCanEdit = function () {
    if (user) {
      return user.items.id === data.id ? true : false
    }
  }



  if (loading) return <PreloaderComponent/>
  return (
    <div className='container'>
      {(isCanEdit() && isTablet) ?
        <div className={isTablet && openEditUser ? 'edit profile' : 'edit profile visibal-collapse'}>
          <EditProfilePage/>
        </div> : null}
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
                <h1 className='profile_info-company_name'>{data.companyName}</h1>
                <p className='profile_info-phone'>{data.phone}</p>
              </div>
            </div>
            {isCanEdit() ? (
              <div className="profile_info-icon" onClick={() => setOpenSubMenu(!openSubMenu)}>
                <span><img src={dots} alt=""/></span>
                {
                  openSubMenu ? <div className='profile_dots'>
                    <MoreSubMenu items={isTablet ? tabletImtes : phoneItems} setOpen={setOpenSubMenu}/> : null
                  </div> : null
                }
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="profile_reviews flex items-center">
            <span>{average}</span>
            <StarComponent average={average} width={19}/>
          </div>
          <div className="profile_cards">
            <h1 className='profile_cards-title'>Мои объявления</h1>
            <div className="nav">
              <label htmlFor={"active"} className='profile_card-active'
                     onClick={() => setChoice('active')}>Активные</label>
              <label htmlFor={"archive"} className='profile_card-archive'
                     onClick={() => setChoice('archive')}
              >Архив</label>
            </div>
            <input type="radio" id="active" name='item' checked/>
            <input type="radio" id="archive" name='item'/>

            <div className={choice === "active" ? "slider" : "slider p-l-50"}></div>
            <div className='flex space-between items-center'>
              {
                isTablet ? (
                  <>
                    <div>
                      <img src={filter_icon} alt=""/>
                    </div>
                    <div className='profile_search flex space-between'>
                      <input type="text" placeholder='Поиск'/>
                      <img src={search_icon} alt="" onClick={() => setFilter(!openFilter)}/>
                      {
                        openFilter ? <MoreSubMenu setOpen={setFilter} items={filterItems}/> : null
                      }
                    </div>
                  </>
                ) : (
                  <>
                    <div className='profile_search flex space-between'>
                      <input type="text" placeholder='Поиск'/>
                      <img src={search_icon} alt=""/>
                    </div>
                    <div>
                      <img src={filter_icon} alt="" onClick={() => setFilter(!openFilter)}/>
                      {
                        openFilter ? <span className='profile_filter'><MoreSubMenu setOpen={setFilter}
                                                                                   items={filterItems}/></span> : null
                      }
                    </div>
                  </>
                )
              }
            </div>

            {
              choice === 'active' ?
                !loading && data.ads.map((item, index) => item.statusAdId === 2 && (
                  <MyCard isCanEdit={isCanEdit()} choice={choice} item={item} key={`card-${index}`}/>
                )) :
                !loading && data.ads.map((item, index) => item.statusAdId === 4 && (
                  <MyCard isCanEdit={isCanEdit()} choice={choice} item={item} key={`card-${index}`}/>
                ))
            }
          </div>
        </div>
      </div>
    </div>

  );


};

export default ProfilePage;
