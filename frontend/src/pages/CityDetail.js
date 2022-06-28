//import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {useEffect } from 'react';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Link as LinkRouter} from "react-router-dom";
import "../styles/citydetail.css";
import { useDispatch, useSelector } from 'react-redux';
//import carditinerary from "../components/CardItinerary";
import itinerariesActions from "../redux/actions/itinerariesActions";
import citiesActions from "../redux/actions/citiesActions";
import CardItinerary from "../components/CardItinerary";

export default function CityDetail() {

//const [cities, setCities] = useState([]) 
const {id} = useParams()
const dispatch=useDispatch()

useEffect(()=>{

//axios.get(`http://localhost:4000/api/cities/${id}`)
//.then(response =>setCities(response.data.response) )
dispatch(itinerariesActions.itinerariesPerCity(id))
dispatch(citiesActions.getOneCity(id))

  
},[])

const itineraries = useSelector(store=> {return store.itinerariesReducer.itineraries})
const cities = useSelector(store=> {return store.citiesReducer.oneCity})

/* console.log(cities) */
  return (
    <>
        <div id="cit" >    
       <Card id="detallecard"  sx={{ Width: "100%"}}>
      <CardActionArea id="card1">
        <CardMedia
          component="img"
          height="120"
          img src={process.env.PUBLIC_URL + ` /imagenes/${cities.image}`} alt="city" className='img-fluid' 
        />
        <CardContent id="textcard">
          <Typography className="title" gutterBottom variant="h5" component="div">
          {cities.name}
          <h2>{cities.country}</h2>
          </Typography>
        </CardContent>
      </CardActionArea>

    </Card>
               
     {/*  //  <LinkRouter  to ={"/Cities"}>
      // <Button id="botonhome"size="small" color="primary" >
     //   Cities
     //  </Button>
     // </LinkRouter>  */}   
           </div> 
           <h2 id="titleh2">Itineraries</h2>
           <div id="itineraries" sx={{ Width: "100%", display: 'flex', justifyContent: 'space-between' }}>
            
             {itineraries.length>0 ? (itineraries.map((itinerary, index)=> 
             <CardItinerary 
             key={index}
             name= {itinerary.name}
             username= {itinerary.username}
             userimage= {itinerary.userimage}
             price= {itinerary.price}
             duration= {itinerary.duration}
             hashtag= {itinerary.hashtag}
             likes= {itinerary.likes}
             activities= {itinerary.activities}  />)):(
              <h1 className="rs">We still do not have guides in this city, we are looking for!</h1>
             )
             }

           </div>
   </>
         
  )
            }
