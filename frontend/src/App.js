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
import { connect } from 'react-redux';
import citiesActions from "./redux/actions/citiesActions"
import Signin from "./components/Singin"
import Signup from './components/Singup';
import userActions from "./redux/actions/userActions"
import  { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import userReducers from './redux/reducers/userReducers';



function App() {

    //const dispatch=useDispatch();
  

  useEffect(()=>{
    setTimeout(()=>{
      window.scrollTo(0,0)
    },500)
  },[]);

   /* useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      const token = localStorage.getItem("token")
    dispatch(userActions.VerificarToken(token));
    } 
  }, [])

  const us = useSelector(store => {return store.userReducers.userReducer});
 console.log(us)
 */
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="*" element={<Home/>}/>
        <Route path="/Cities" element={<PageCities/>}/>
        <Route path="/CityDetail/:id" element={<CityDetail/>}/>
        <Route path="/auth/SignIn" element={<Signin/>}/>
        <Route path="/auth/SignUp" element={<Signup/>}/>
      </Routes>
      <Toaster
      position="bottom-center"
      reverseOrder={true} />
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
const mapDispachToProp = {
  getCities:citiesActions.getCities
}
export default connect(null,mapDispachToProp)(App);