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

    signInUser:(logerUser)=>{
        return async (dispatch, getState) =>{

            const user= await axios.post(apiUrl+"api/auth/SignIn", {logerUser})
            if(user.data.success){
                localStorage.setItem("token", user.data.response.token)
                dispatch({type:"user", payload:user.data.response.userData});
                dispatch({type:"userList"})
            }
           dispatch({
               type:"message",
               payload:{
                   view:true,
                   message:user.data.message,
                   success:user.data.success
               }
           });
        }
    },

    signOutUser: (closeuser) => {
        return async (dispatch, getState) => {
            const user = await axios.post(apiUrl+"api/auth/SignOut", { closeuser })
            localStorage.removeItem('token')
            dispatch({ type: 'user', payload: null });
            dispatch({type:'userList'})
            return user
        }
        
    },
    VerificarToken: (token) => {

        return async (dispatch, getState) => {

            await axios.get(apiUrl+"api/auth/SignInToken", {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(user => {
                    if (user.data.success) {
                        dispatch({ type: 'user', payload: user.data.response });
                        dispatch({type:'userList'})
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
                    if (error.response.status === 401)
                        dispatch({
                            type: 'message',
                            payload: {
                                view: true,
                                message: "Por favor realize nuevamente su signIn", //pasar a ingles
                                success: false
                            }
                        })
                    localStorage.removeItem('token')
                })
        }
    }



}
export default userActions