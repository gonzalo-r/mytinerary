import React, { useRef, useState } from "react"; 
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";  
// Import Swiper styles 
import "swiper/css"; 
import "swiper/css/pagination";  
import "swiper/css/grid"
// import required modules 
import { Pagination, Autoplay, Grid } from "swiper";  
import datos from "./datos"; 
import "../styles/carrousel.css";

export default function Carrousel() {
     return (     
    <div className="gallery">    
    <h2>Popular MYtineraries</h2>   
    <Swiper         
        slidesPerView={2}      
        slidesPerGroup={4}         
        spaceBetween={30}         
        pagination={{           
            clickable: true,         
        }}         
        modules={[Pagination, Autoplay, Grid]}         
        autoplay={{delay: 4000, disableOnInteraction: false }}         
        className="mySwiper"         
        breakpoints={{           
            "@0.00":{             
                slidesPerView: 1,             
                spaceBetween: 10,           
            },           
            "@0.75":{             
                slidesPerView: 2,             
                spaceBetween: 10,           
            },           
            "@1.00":{             
                slidesPerView: 2,             
                spaceBetween: 10,
            },
            "@1.50":{             
                slidesPerView: 4,             
                spaceBetween: 10,           
            }         
        }}       
        >  
        {datos.map((ciudad,index)=> 
        <SwiperSlide id="cadaCard" key={index}>
            <img src={process.env.PUBLIC_URL + `/imagenes/${ciudad.image}`}/>
            <p style={{color:"black"}}>{ciudad.name}</p>
        </SwiperSlide> 
        )}               
        
        </Swiper>     
        </div>   
        ); 
    }

