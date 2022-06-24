//import { Home } from "@mui/icons-material";
import React from "react";
import Carrousel from "../components/Carrousel";
import Hero from "../components/Hero";
import "../styles/home.css";
import { useEffect } from 'react';


function Home(){

    useEffect(() => {
    const spans = document.querySelectorAll('.word span');
    spans.forEach((span, idx) => {
        span.addEventListener('mousemove', (e) => {
            e.target.classList.add('active');
        });
          span.addEventListener('animationend', (e) => {
            e.target.classList.remove('active');
        });  
        
        // Initial animation
        setTimeout(() => {
            span.classList.add('active');
        }, 750 * (idx+1))
    });
   
}, []);
    
return(
    <div>   
      <article className="App-header">
      <div className="word">
      <span>My</span>
      <span>Ti</span>
      <span>ne</span>
      <span>ra</span>
      <span>ry</span>
      </div> 
       <p  style={{fontSize:"35px", padding:"1rem 0.5rem", color:"black", fontStyle: "italic", fontWeight:"500", textAlign:"center" }}>
       Find your perfect trip,<br/>
       designed by insiders who know and love their cities!
       </p>
       </article>    
       
<Hero/>
<Carrousel/>
</div>
)
}
export default Home;