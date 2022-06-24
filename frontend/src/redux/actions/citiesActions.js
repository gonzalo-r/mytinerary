import axios from "axios";

let apiUrl="http://localhost:4000/"

const citiesActions={  //es un objeto que tiene adentro dif metodos-->getAllCities, getOneCity

    getCities:()=>{ //es un metodo y un obj
        return async(dispatch, getState)=>{ //retorna una funcion anonima asicrona q recibe de parametro el dispatch(q es un hook, no podemos poner un hook por estos se usan en componentes
            //de tipo funcion.como no lo puedo exportar se lo envio como parametro por el metodo getAllcities  y getstate q no c esta usando
            //getstate obtiene el estado que tenga y lo modifica 
            try{
            const res=await axios.get(apiUrl+"api/cities")//(el prof "${urlBackend}/api/places/getallplaces") llamar la ruta del backend
        dispatch({type:"GET_CITIES", payload: res.data.response.cities}) //una vez q recibo la info de la api del back hace un dispatch y pasa la info a reducers
        //el dispatch devuelve un objeto con 2 propiedaddes type y payload
        //console.log(res.data.response.cities)

        }catch(error){
            console.log(error)
        }
      }
    },

    getOneCity: (id)=>{
        return async (dispatch, getstate)=>{
            try{
            const res=await axios.get(apiUrl+`api/cities/${id}`)
            dispatch({type:"GET_ONE_CITY", payload:res.data.response})
        }catch(error){
            console.log(error)
        }
        }
    },

    filterC: (searchTitle)=>{
        return (dispatch, getstate)=>{
        
                dispatch({type:"FILTER_CITY", payload:searchTitle}) 
          
        }
    }
}
export default citiesActions