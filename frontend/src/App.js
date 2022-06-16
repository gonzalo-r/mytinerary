import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import NavBar from "./components/NavBar";
import Home from './pages/Home';
import PageCities from './pages/Cities';
import Footer from './components/Footer';
import React, {useEffect} from "react";
import ScrollToTop from "react-scroll-to-top";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CityDetail from "./pages/CityDetail";


function App() {
  useEffect(()=>{
    setTimeout(()=>{
      window.scrollTo(0,0)
    },500)
  },[])

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="*" element={<Home/>}/>
        <Route path="/Cities" element={<PageCities/>}/>
        <Route path="/CityDetail/:id" element={<CityDetail/>}/>
      </Routes>
      <Footer/>
      <ScrollToTop
      smooth
      viewBox='0 0 24 24'
      component={<KeyboardDoubleArrowUpIcon/>}
      />
      </BrowserRouter>
    </div>
  );
}

export default App;
