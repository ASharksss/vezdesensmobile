import React, {useEffect} from 'react';
import {Outlet, useLocation} from "react-router";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const LayoutHeader = () => {

  const location = useLocation()

  useEffect(() => {
    localStorage.setItem('last_path', location.pathname + location.search)
  }, [location.pathname])

  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default LayoutHeader;
