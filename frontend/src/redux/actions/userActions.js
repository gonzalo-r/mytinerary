 import axios from "axios";

let apiUrl="http://localhost:4000/"

const userActions ={

    signUpUser:(data) =>{
        return async (dispatch, getState) =>{
            const res = await axios.post(apiUrl+"api/auth/SignUp", { data }) // llama a esta ruta y le va a pasar esta data por body
            console.log(res) //chequear como llega la info
            dispatch({
                type:"message", //deberia llamar a un alert q muestre el contenido del payload
                payload:{
                    view: true,
                    message: res.data.message, //un mensaj como alert
                    success: res.data.success //define el color v o R
                }
            });
            return res
        }
    },

    signInUser:(dataSingin)=>{
        return async (dispatch, getState) =>{
            
            const user= await axios.post(apiUrl+"api/auth/SignIn", {dataSingin})
            console.log(user.data)

            if(user.data.success){
                localStorage.setItem("token", user.data.response.token)
                dispatch({type:"user", payload:user.data.response.userData});//userData viene del controlador
                //dispatch({type:"userList"})
            }
           dispatch({
               type:"user",
               payload:user.data.response
          
           });
           return user
        }
    },

    signOutUser: () => {
        return async (dispatch, getState) => {
        //const user = await axios.post(apiUrl+"api/auth/SignOut", { closeuser })
            localStorage.removeItem('token')
            dispatch({ type: 'user', payload: null });
          
        }
        
    },
    VerificarToken: (token) => {

        return async (dispatch, getState) => {

             await axios.get(apiUrl+"api/auth/SignInToken", {
                headers: {                                            // va a pasar por cabecera un dato de tipo autorizacion
                    'Authorization': 'Bearer ' + token                 //bearer es un metodo seguro para autentificacion
                }
            })
                .then(user => {
                    if (user.data.success) {
                        dispatch({ type: 'user', payload: user.data.response }); //me despacha los datos del usuarios luego de la verificacion
                        console.log(user.data)
                        //dispatch({type:'userList'}
                        dispatch({
                            type: 'message',
                            payload: {
                                view: true,
                                message: user.data.message,
                                success: user.data.success
                            }
                        });
                    } else {
                        localStorage.removeItem('token')
                    }
                }
                ).catch(error => {
                    if (error.response.status === 401) //error 401 el token estaba pero no era correcto o expiro, por lo q sea
                        dispatch({
                            type: 'message',
                            payload: {
                                view: true,
                                message: "Por favor realize nuevamente su signIn", //pasar a ingles o su sesion expiro, singin nuevamente
                                success: false
                            }
                        })
                       
                    localStorage.removeItem('token')
                })
                
        }
    }



}
export default userActions