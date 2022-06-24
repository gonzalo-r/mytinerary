//nuestro reducer mantiene los estados y con que accion nosotros lo vamos a modificar
const initialState={ //defino las variables o datos de contexto iniciales y con que valor
    cities:[],
    filterCities:[],
    oneCity:{}
}

//declaro mi reducer
const citiesReducer = (state =initialState, action)=>{ //recibe el state inicial y va a recibir una accion com parametro
    //console.log(action)
   // console.log(state)
    switch(action.type){ //cuando el tipo de accion que viene sea...allcities, filtro depende el caso...
        case "GET_CITIES":
            return{
                ...state,  //le va a retornar a getcities los 3 item q sigue. Payload(que podria ser otro nombre, es el valor de carga)
                cities:action.payload            
            }
        case "GET_ONE_CITY":
                return{
                    ...state,  //le va a retornar a getcities los 3 item q sigue. Payload(que podria ser otro nombre, es el valor de carga)
                    oneCity:action.payload                 
                }

        case "FILTER_CITY": 
            const filter1 =state.cities.filter((city1=>city1.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))) //lo que venga lo va a filtrar
            //console.log(action.payload)
            return{
                ...state,
                filterCities: filter1 //el rdo del filtro lo guarda aca y va a actualizar el state
            }
        default:
            return state    
    }
}

export default citiesReducer