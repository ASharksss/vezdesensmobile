import './App.css';
import CardPage from "./pages/CardPage";
import Footer from "./components/Footer/Footer";
import BoardPage from "./pages/BoardPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import ProfilePage from "./pages/ProfilePage";
import MessagesPage from "./pages/MessagesPage";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<BoardPage/>}/>
            <Route path='/cardPage' element={<CardPage/>}/>
            <Route path='/cardPage' element={<CardPage/>}/>
          </Route>
          <Route path='/profilePage' element={<ProfilePage/>}/>
          <Route path='/messages' element={<MessagesPage/>}/>
          <Route path='/dialog' element={<MessagesPage/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>


    </div>
  );
}

export default App;
