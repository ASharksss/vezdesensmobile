import './App.css';
import axios from "axios";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CardPage from "./pages/CardPage";
import BoardPage from "./pages/BoardPage";
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";
import DialogPage from "./pages/DialogPage";
import LayoutAll from "./LayoutAll";
import LayoutFooter from "./LayoutFooter";
import SubCategoryPage from "./pages/SubCategoryPage";
import CategoryPage from "./pages/CategoryPage";
import ServicePage from "./pages/ServicePage";
import EditProfilePage from "./pages/EditProfilePage";
import SupportPage from "./pages/SupportPage";
import Auth from "./pages/Auth";
import NewPassword from "./pages/NewPassword";
import Registration from "./pages/Registration";
import ReviewPage from "./pages/ReviewPage";
import AddReviewPage from "./pages/AddReviewPage";
import {useEffect, useState} from "react";
import {getCookie, isOnline} from "./utils";
import {fetchAuth} from "./redux/slices/AuthSlice";
import SimilarPage from "./pages/SimilarPage";
import FavoritePage from "./pages/FavoritePage";
import FilterPage from "./pages/FilterPage";
import CreateCardPage from "./pages/CreateCardPage";
import DialogAppeal from './components/Support/dialogAppeal';
import RegistrationBuisness from "./pages/RegistrationBuisness";
import {useTabletDetection} from "./redux/hooks/useTabletDetection";
import {firstLoading, takeFromCookie} from "./redux/slices/GeoSlice";
import EditCardPage from "./pages/EditCardPage";


axios.defaults.baseURL = "https://backend.vezdesens.ru/"
// axios.defaults.baseURL = "http://localhost:5000/"
// axios.defaults.baseURL = "http://192.168.1.119:5000/"

function App() {
  const dispatch = useDispatch()
  const {isAuth, user} = useSelector(state => state.user)

  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState(true)

  const loadingIsAuth = user.status === 'loading'

  const isTablet = useTabletDetection(); //првоерка размера
  useEffect(() => {
    function checkAuth() {
      const checkSession = getCookie('session')
      if (checkSession !== undefined) {
        dispatch(fetchAuth(checkSession))
      }
    }

    return checkAuth()
  }, [])

  useEffect(() => {
    function checkPosition() {
      const checkGeo = getCookie('position')
      if (checkGeo !== undefined) {
        dispatch(takeFromCookie(checkGeo))
      }else {
        dispatch(firstLoading())
      }
    }
    return checkPosition()
  }, [])

  useEffect(() => {
    if (!loadingIsAuth) {
      setLoading(false)
    }
  }, [loading])

  useEffect(() => {
    const onlineInterval = setInterval(async () => {
      await isOnline().then(res => setOnline(res))
    }, 10000)
    return () => clearInterval(onlineInterval)
  }, [])

  if (!online) {
    return <div className='flex center items-center' style={{fontSize: 32, fontStyle: 'italic', height: '100vh'}}>Нет
      интернета</div>
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>

          <Route element={<LayoutAll/>}>
            <Route path='/' element={<BoardPage/>}/>
            <Route path='/similarPage' element={<SimilarPage/>}/>
            {isTablet ? 
                      <Route path='/cardPage/:id' element={<CardPage/>}/>
              : null
            }
          </Route>

          <Route element={<LayoutFooter/>}>
            <Route path='/profilePage/:id' element={<ProfilePage/>}/>
            <Route path='/messages' element={<MessagesPage/>}/>
            <Route path='/categoryPage/:id/:sId/:obId' element={<CategoryPage/>}/>
            <Route path='/servicePage/:id/:sId/:obId' element={<ServicePage/>}/>
            <Route path='/favoritePage' element={<FavoritePage/>}/>
            <Route path='/support' element={<SupportPage/>}/>
          </Route>

          {!isAuth &&
            <>
              <Route path='/auth' element={<Auth/>}/>
              <Route path='/registration' element={<Registration/>}/>
              <Route path='/registrationBuisness' element={<RegistrationBuisness/>}/>
            </>
          }
          <Route path='/newPassword' element={<NewPassword/>}/>
          <Route path='/cardPage/:id' element={<CardPage/>}/>
          <Route path='/dialog' element={<DialogPage/>}/>
          <Route path='/subCategory/:id' element={<SubCategoryPage/>}/>
          <Route path='/subCategory/:id/:obId' element={<SubCategoryPage/>}/>
          <Route path='/efitProfile' element={<EditProfilePage/>}/>
          <Route path='/review' element={<ReviewPage/>}/>
          <Route path='/addReview' element={<AddReviewPage/>}/>
          <Route path='/filterPage' element={<FilterPage/>}/>
          <Route path='/createAd' element={<CreateCardPage/>}/>
          <Route path='/appeal' element={<DialogAppeal/>}/>

          <Route path='/editProfile/:id' element={<EditProfilePage/>}/>
          <Route path='/editCard/:id' element={<EditCardPage/>}/>
        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
