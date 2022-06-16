import React from 'react';
 import axios from "axios"; 
import { useState, useEffect } from 'react'
import CitiesCards from "../components/CitiesCards";

export default function PageCities() {

    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState([]); // trae de la api
    const [searchTitle, setSearchTitle] = useState(""); //input search

    useEffect(() => {
        const loadPosts = async () => {
          setLoading(true);
          const response = await axios.get('http://localhost:4000/api/cities'); 
          setCities(response.data.response.cities);
          setLoading(false);    
        };

        loadPosts();
      }, []);
      console.log(cities)
      console.log(searchTitle)

      return (
        <>
        
        <div className='searchfilter'>
          <h3>Search City</h3>
          <input
            type="text"
            placeholder="Search..."
            onChange={(evento) => setSearchTitle(evento.target.value)} />
        </div>

           <div className="container d-flex justify-content-center h-100">
          <div id="cards" className='row'>
          {loading ? ( <h4>Loading ...</h4> ) : (
            cities.filter((card) => {
                if (searchTitle === "") {
                  return card;
                } else if (
                  card.name.substring(0, searchTitle.trim().length).toLowerCase() === searchTitle.toLowerCase().trim() 
                ) {
                  return card;
                } else if(
                  card.name.substring(0, searchTitle.trim().length).toLowerCase() !== searchTitle.toLowerCase().trim()
                  ){
                  return console.log("funciona")
                }
                return console.log(searchTitle)
              } ) 
              .map((item) => 
              <div id="card" className='col-md-4 container-fluid'   >
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
     
       
        </>
      )

    }


    