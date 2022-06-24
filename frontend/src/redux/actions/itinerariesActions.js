import axios from "axios";

let apiUrl="http://localhost:4000/"

const itinerariesActions={  //es un objeto que tiene adentro dif metodos-->getAllCities, getOneCity
  
    itinerariesPerCity: (id)=>{
        return async (dispatch, getstate)=>{
            try{
            const res=await axios.get(apiUrl+`api/cityItineraries/${id}`)
            dispatch({type:"ITINERARIES_PER_CITY", payload:res.data.response})
            console.log(res.data.response)
        }catch(error){
            console.log(error)
        }
        }
    },

}
export default itinerariesActions