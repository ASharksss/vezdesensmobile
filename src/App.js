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
import {getCookie, isOnline, useTabletDetection} from "./utils";
import {fetchAuth} from "./redux/slices/AuthSlice";
import SimilarPage from "./pages/SimilarPage";
import FavoritePage from "./pages/FavoritePage";
import FilterPage from "./pages/FilterPage";
import SelectFilterPage from "./pages/SelectFilterPage";
import CreateCardPage from "./pages/CreateCardPage";

axios.defaults.baseURL = "https://backend.vezdesens.ru/"

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
              : console.log('err')
          }
          </Route>

          <Route element={<LayoutFooter/>}>
            <Route path='/profilePage/:id' element={<ProfilePage/>}/>
            <Route path='/messages' element={<MessagesPage/>}/>
            <Route path='/categoryPage/:id' element={<CategoryPage/>}/>
            <Route path='/servicePage' element={<ServicePage/>}/>
            <Route path='/favoritePage' element={<FavoritePage/>}/>
          </Route>

          {!isAuth &&
            <>
              <Route path='/auth' element={<Auth/>}/>
              <Route path='/registration' element={<Registration/>}/>
            </>
          }
          <Route path='/newPassword' element={<NewPassword/>}/>
          <Route path='/cardPage/:id' element={<CardPage/>}/>
          <Route path='/dialog' element={<DialogPage/>}/>
          <Route path='/support' element={<SupportPage/>}/>
          <Route path='/subCategory/:id' element={<SubCategoryPage/>}/>
          <Route path='/subCategory/:id/:obId' element={<SubCategoryPage/>}/>
          <Route path='/editProfile' element={<EditProfilePage/>}/>
          <Route path='/review' element={<ReviewPage/>}/>
          <Route path='/addReview' element={<AddReviewPage/>}/>
          <Route path='/filterPage' element={<FilterPage/>}/>
          <Route path='/selectFilterPage' element={<SelectFilterPage/>}/>
          <Route path='/createAd' element={<CreateCardPage/>}/>
          <Route path='/efitProfile/:id' element={<CreateCardPage/>}/>
        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
