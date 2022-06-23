/* import {ITINERARIES_GET} from "../actions/types";

const initialState = {
    itineraries:[],
    aux:[]
}

const itinerariesReducer = (state = initialState, action)=>{
    switch(action.type){
        case ITINERARIES_GET
    }
} */


import axios from 'axios';
import { ITINERARIES_GET } from "../actions/types";

const itinerariesReducer = {

itinerariesCity: (id) => {
    
    return async(dispatch, getState)=>{
    const res = await axios.get('http://localhost:4000/api/cityItineraries?cityId='+id) //ver bien la ruta
    
    dispatch({type: ITINERARIES_GET, payload:res.data.response})
    
    }
},
 

}

export default itinerariesActions