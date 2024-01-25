import React from 'react';
import Footer from "./components/Footer/Footer";
import {Outlet} from "react-router";
import Header from "./components/Header/Header";

const LayoutHeader = () => {
	return (
		<div>
			<Header/>
			<Outlet/>
			<Footer/>
		</div>
	);
};

export default LayoutHeader;