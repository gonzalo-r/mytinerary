import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {useEffect } from 'react';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Link as LinkRouter} from "react-router-dom";
import "../styles/citydetail.css";

export default function CityDetail() {

const [cities, setCities] = useState([]) 
const {id} = useParams()

useEffect(()=>{

axios.get(`http://localhost:4000/api/cities/${id}`)
.then(response =>setCities(response.data.response) )
  
},[])
console.log(cities)
  return (
           <div id="cities">    
               <h1 className="detalletitulo"> {cities.name}</h1>
               <h2>{cities.country}</h2>
               <img src={process.env.PUBLIC_URL + ` /imagenes/${cities.image}`}/>     
       <LinkRouter  to ={`./Home`}>
       <Button id="botonhome"size="small" color="primary" >
        Home
       </Button>
      </LinkRouter>     
           </div> 
         )
     }
