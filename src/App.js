import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import NavBar from "./components/NavBar";
import Home from './pages/Home';
import Cities from './pages/Cities';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="*" element={<Home/>}/>
        <Route path="/Cities" element={<Cities/>}/>
      </Routes>
      <Footer/>

      </BrowserRouter>
    </div>
  );
}

export default App;
