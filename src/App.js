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

axios.defaults.baseURL = "https://backend.vezdesens.ru/"

function App() {
  const dispatch = useDispatch()
  const {isAuth, user} = useSelector(state => state.user)

  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState(true)

  const loadingIsAuth = user.status === 'loading'

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
      await isOnline().then(res => console.log(setOnline(res)))
    }, 10000)
    return () => clearInterval(onlineInterval)
  }, [])

  if (!online) {
    return <div className='flex center items-center' style={{fontSize: 32, fontStyle: 'italic', height: '100vh'}}>Нет интернета</div>
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>

          <Route element={<LayoutAll/>}>
            <Route path='/' element={<BoardPage/>}/>
          </Route>

          <Route element={<LayoutFooter/>}>
            <Route path='/profilePage/:id' element={<ProfilePage/>}/>
            <Route path='/messages' element={<MessagesPage/>}/>
            <Route path='/categoryPage' element={<CategoryPage/>}/>
            <Route path='/servicePage' element={<ServicePage/>}/>
          </Route>

          {!isAuth &&
          <>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/registration' element={<Registration/>}/>
          </>}
          <Route path='/newPassword' element={<NewPassword/>}/>
          <Route path='/cardPage/:id' element={<CardPage/>}/>
          <Route path='/dialog' element={<DialogPage/>}/>
          <Route path='/support' element={<SupportPage/>}/>
          <Route path='/subCategory' element={<SubCategoryPage/>}/>
          <Route path='/editProfile' element={<EditProfilePage/>}/>
          <Route path='/review' element={<ReviewPage/>}/>
          <Route path='/addReview' element={<AddReviewPage/>}/>

        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
