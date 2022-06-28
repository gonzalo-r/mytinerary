import React from 'react';
import { useState, useEffect } from 'react'
import CitiesCards from "../components/CitiesCards";
import "../styles/cities.css"
import citiesActions from "../redux/actions/citiesActions"
import {useSelector, useDispatch} from "react-redux"

export default function PageCities() {

    const [searchTitle, setSearchTitle] = useState(""); //input search
    const dispatch = useDispatch() //trae las acciones

    useEffect(() => {

            dispatch(citiesActions.getCities()) 
           dispatch(citiesActions.filterC(searchTitle))
     
      }, [searchTitle]);

      const cities=useSelector(store=>store.citiesReducer.cities)
      const citiesFilter=useSelector(store=>store.citiesReducer.filterCities)
      console.log(citiesFilter)

      return (
        <>   
        <div className='searchfilter' >
          <h1 >Search City</h1>
          <input
            type="text"
            placeholder="Search..."
            onKeyUp ={(evento) => setSearchTitle(evento.target.value)} />
        </div>
        <div id="render">
           <div id="render1" className="container d-flex">
              <div id="render2">
                 {(citiesFilter.length > 0|| cities)? ( citiesFilter.map((item) =>
              
                 <div id="allcards"  >
                 <CitiesCards 
                      title={item.name}
                      image={item.image}
                      id={item._id}
                      key={item._id} />  
                 </div>
                )):(<h2 className="title h2 text-center textCarr">Ups...<br/>we did not find your city</h2>)}
              </div>
           </div> 
        </div>
        </>
      )
    }
 
