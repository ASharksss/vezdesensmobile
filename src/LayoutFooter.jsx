import React from 'react';
import Footer from "./components/Footer/Footer";
import {Outlet} from "react-router";
import Header from "./components/Header/Header";

const LayoutFooter = () => {
	return (
		<div>
			<Outlet/>
			<Footer/>
		</div>
	);
};

export default LayoutFooter;