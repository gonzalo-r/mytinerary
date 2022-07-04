import {combineReducers} from "redux"; //importo la funcionalidad para poder combinarlos a todos en uno reducer(main)
import  citiesReducer from "./citiesReducer";
import  itinerariesReducer from "./itinerariesReducer";
import userReducer from "./userReducer";

const mainReducer = combineReducers({
    citiesReducer,
    itinerariesReducer,
    userReducer,
})

export default mainReducer //main reducer va a  tener la info de todos los otros