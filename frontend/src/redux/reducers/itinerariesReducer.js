//nuestro reducer mantiene los estados y con que accion nosotros lo vamos a modificar
const initialState={ //defino las variables o datos de contexto iniciales y con que valor
    itineraries:[],
    aux:[]
}

//declaro mi reducer
const itinerariesReducer = (state =initialState, action)=>{ //recibe el state inicial y va a recibir una accion com parametro
    //console.log(action)
    switch(action.type){ //cuando el tipo de accion que viene sea...allcities, filtro depende el caso...
        case "ITINERARIES_PER_CITY":
            return{
                ...state,  //le va a retornar a getcities los 3 item q sigue. Payload(que podria ser otro nombre, es el valor de carga)
                itineraries:action.payload            
            }
        default:
            return state    
    }
}

export default itinerariesReducer