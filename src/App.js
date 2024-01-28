import './App.css';
import CardPage from "./pages/CardPage";
import Footer from "./components/Footer/Footer";
import BoardPage from "./pages/BoardPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";
import DialogPage from "./pages/DialogPage";
import LayoutHeader from "./LayoutFooter";
import LayoutAll from "./LayoutAll";
import LayoutFooter from "./LayoutFooter";
import SubCategoryPage from "./pages/SubCategoryPage";
import CategoryPage from "./pages/CategoryPage";
import ServicePage from "./pages/ServicePage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>

          <Route element={<LayoutAll/>}>
            <Route path='/' element={<BoardPage/>}/>
          </Route>

          <Route element={<LayoutFooter/>}>
            <Route path='/profilePage' element={<ProfilePage/>}/>
            <Route path='/messages' element={<MessagesPage/>}/>
            <Route path='/categoryPage' element={<CategoryPage/>}/>
            <Route path='/servicePage' element={<ServicePage/>}/>
          </Route>

          <Route path='/cardPage' element={<CardPage/>}/>
          <Route path='/dialog' element={<DialogPage/>}/>
          <Route path='/subCategory' element={<SubCategoryPage/>}/>
          <Route path='/editProfile' element={<EditProfilePage/>}/>

        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
