import './App.css';
import CardPage from "./pages/CardPage";
import Footer from "./components/Footer/Footer";
import BoardPage from "./pages/BoardPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";

function App() {
	return (
		<div className="container">
			<BrowserRouter>
				<Routes>
					<Route element={<Layout/>}>
						<Route path='/' element={<BoardPage/>}/>
						<Route path='/cardPage' element={<CardPage/>}/>
					</Route>
				</Routes>
				<Footer/>
			</BrowserRouter>


		</div>
	);
}

export default App;
