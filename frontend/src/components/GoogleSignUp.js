 import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions';
import toast, { Toaster } from 'react-hot-toast';


export default function GoogleSingUp(props) {
   console.log(props)
    const dispatch = useDispatch();

    async function handleCallbackResponse(response) {

        console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        let data={
            firstName: userObject.given_name,
            lastName: userObject.family_name, 
            image: userObject.picture, 
            email: userObject.email, 
            password: userObject.sub, 
            country: props.country,
            from: 'google'
        }
        let res = await dispatch(userActions.signUpUser(data))
        console.log(res.data)
        
        
        if(res.data.success){
            console.log(res.data.success)
              toast.success( res.data.message)
             
            
          }  else{
                if(res.data.response){       
                     res.data.response.map(oneMsg=>{
                   toast.error(oneMsg.message)  })             
                 }else { 
                   return toast.error(res.data.message)
                 }
                }   
    }

    useEffect(() => {
        /* global google  */
        google.accounts.id.initialize({
            client_id: '132585096354-jngh5vum1ncs00abrshn3c1iu0odqkjh.apps.googleusercontent.com', 
            context: "signup",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "large" }
        )
    });

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}

 