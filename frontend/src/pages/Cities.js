import React from 'react';
 import axios from "axios"; 
import { useState, useEffect } from 'react'
import CitiesCards from "../components/CitiesCards";
import "../styles/cities.css"
import{connect} from "react-redux"
import citiesActions from "../redux/actions/citiesActions"

export default function PageCities(props) {

    const [loading, setLoading] = useState(false);
    //const [cities, setCities] = useState([]); // trae de la api
    const [searchTitle, setSearchTitle] = useState(""); //input search

    useEffect(() => {
        const loadPosts = async () => {
          setLoading(true);

          //axios.get('http://localhost:4000/api/cities')
          //.then(response=> setCities(response.data.response.cities))
          //setLoading(false);    
        };

        loadPosts();
      }, []);
      console.log(cities)
      console.log(searchTitle)

      return (
        <>   
        <div className='searchfilter'>
          <h1>Search City</h1>
          <input
            type="text"
            placeholder="Search..."
            onKeyUp ={(evento) => setSearchTitle(evento.target.value)} />
        </div>
        <div id="render">
           <div id="render1" className="container d-flex">
              <div id="render2">
          {loading ? ( <h4>Loading ...</h4> ) : (
            props.filter((element) => {
              
                if (searchTitle !== ""){       
                    if (  element.name.substring(0, searchTitle.trim().length).toLowerCase() === searchTitle.trim().toLowerCase())                  
                       {return element; }                                  
                    } else {
                     return <h2 className="title h2 text-center textCarr">Ups...<br/>we did not find your city</h2>
                  }                          
              })
              .map((item) => 
              <div id="allcards"  >
             <CitiesCards 
             title={item.name}
            image={item.image}
            id={item._id}
            key={item._id}
            />
          </div>

          ))}

          </div>
      
        </div>
     
        </div>
        </>
      )

    }
 
